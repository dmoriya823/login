require('dotenv').config()
const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const passport = require('./auth');
const session = require('express-session');
const flash = require('connect-flash');
const PORT = 3000;
const cookieParser = require('cookie-parser');
const crypto = require('crypto');

app.use(cookieParser());

// 暗号化につかうキー
const APP_KEY = 'YOUR-SECRET-KEY';

const SerialPort = require('serialport');
const parsers = SerialPort.parsers;
const parser = new parsers.Readline({
    delimiter: '\r\n'
});
const port = new SerialPort('/dev/ttyUSB0',{
    baudRate: 115200
});
port.pipe(parser);

var flag = 0;
var num = 0;
var id = 0;

const receive = () => {
  return new Promise(resolve => {
    parser.on('data', (data) => {
      // console.log(data);
      var mes = data;
      if(mes.substr(1,2) == 'DB'){
        if(mes.substr(7,2) == '01'){
          console.log('communication success');
          resolve(true);
        }else{
          console.log('communication error');
          resolve(false);
        }
      }else if(mes.substr(1,2) == '00'){
        var temp = mes.substr(29,2);
        temp =  parseInt(temp, 16);
        temp += 256;
        temp /= 10;
        // console.log(temp);
        resolve(temp);
      }
    });
  })
}

async function endReceive(){
  const result = await receive();
  
  // if(result){
  //   showMsg("成功しました");
  // }else{
  //   showMsg("失敗しました");
  // }
  
  return result;
}

const mustacheExpress = require('mustache-express');
const e = require('express');
const { resolve } = require('path');
app.engine('mst', mustacheExpress());
app.set('view engine', 'mst');
app.set('views', __dirname + '/views');
// ミドルウェア
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(flash());
app.use(session({
  secret: 'YOUR-SECRET-STRING',
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static('public'));
// app.use(express.static('node_modules'));
// app.use(express.static('models'));
// app.use(express.static(path.join(__dirname, 'public')));

const mysql = require('mysql');
// const connection = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: 'superman',
//   database: 'sakamoto'
// });
const connection = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'superman',
  database: 'sakamoto'
});


const authMiddleware = (req, res, next) => {
  if(req.isAuthenticated()) {
    next();
  } else if(req.cookies.remember_me) {
    const [rememberToken, hash] = req.cookies.remember_me.split('|');
    User.findAll({
      where: {
        rememberToken: rememberToken
      }
    }).then(users => {
      for(let i in users) {
        const user = users[i];
        const verifyingHash = crypto.createHmac('sha256', APP_KEY)
          .update(user.id +'-'+ rememberToken)
          .digest('hex');
        if(hash === verifyingHash) {
          return req.login(user, () => {
            // セキュリティ的はここで remember_me を再度更新すべき
            next();
          });
        }
      }
      res.redirect(302, '/login');
    });
  } else {
    res.redirect(302, '/login');
  }
};

app.get('/qr', (req, res) => {
  // res.cookie('flag', true,{
  // 	maxAge: 5*60*1000,
	// path: '/'
  // });
  flag = 1;
  res.redirect('/login');
});

// ログインフォーム
app.get('/login', (req, res) => {
  const errorMessage = req.flash('error').join('<br>');
  res.render('login/form', {
    errorMessage: errorMessage
  });
});

// ログイン実行
app.post('/login',
  passport.authenticate('local', {
    failureRedirect: '/login',
    failureFlash: true,
    badRequestMessage: '「学籍番号」と「パスワード」は必須入力です。'
  }),
  (req, res, next) => {

    if(!req.body.remember) {  // 次回もログインを省略しない場合

      res.clearCookie('remember_me');
      return next();

    }

    const user = req.user;
    num = user;
    const rememberToken = crypto.randomBytes(20).toString('hex'); // ランダムな文字列
    const hash = crypto.createHmac('sha256', APP_KEY)
      .update(user.id +'-'+ rememberToken)
      .digest('hex');
    user.rememberToken = rememberToken;
    user.save();

    res.cookie('remember_me', rememberToken +'|'+ hash, {
      path: '/',
      maxAge: 5 * 365 * 24 * 60 * 60 * 1000 // 5年
    });

    return next();

  },
  (req, res) => {
    // if(req.cookies.flag){
  	//   res.clearCookie('flag');
    //  	res.redirect('/user2');
    // }else{
	  //   res.redirect('/user');
    //  }
    if(flag == 1){
      flag = 0;
      res.redirect('/user2');
    }else{
      res.redirect('/user');
    }
  }
);

// ログイン成功後のページ
app.get('/user', authMiddleware, (req, res) => {
  num = req.user;

  // connection.query('INSERT INTO Temperatures (number, temperature) VALUES (' + num.number + ',36.7)', (err,rows) => {
  //   if(err) throw err;
  //   console.log('Insert success');
  // });

  // res.redirect('user.html');
  // res.sendFile(__dirname+'/public/userpage.html');
  res.render('login/userpage', {
    user: num.number
  });

  // console.log(user.number);

  // connection.connect((err) => {
  //   if(err) throw err;
  //   console.log('Connected!');
  // });

});

app.get('/user2', authMiddleware, (req, res) => {
  port.write(':00A001FF01X', (err, results) => {
    if(err) {
        console.log('Err: '+err);
        console.log('Results: '+results);
    }
  });

  // const user = req.user;
  num = req.user;

  //var toString = Object.prototype.toString
  endReceive().then(result => {
    if(result){
      //res.sendFile(`${__dirname}/public/wait.html`);
      res.redirect('/wait');
      // res.send('Successful communication');
      // console.log(toString.call(result));
      // res.render('login/wait.mst',{
      //   wait: false
      // });
    }else{
      res.send('communication error');
    }
  });
});

app.get('/wait', authMiddleware, (req, res) => {
  res.sendFile(`${__dirname}/public/wait.html`);
  var toString = Object.prototype.toString;
  endReceive().then(result =>{
    if(toString.call(result) == '[object Number]'){
      console.log(result + ' receive');
      // const temper = String(result);
      connection.query(`INSERT INTO Temperatures (number, temperature) VALUES (${num.number}, ${result})`, (err,rows) => {
        if(err) throw err;
        console.log('Insert success');
      });
      if(id!=0){
        io.to(id).emit('message', 'received');
      }else{
        console.log('id not found');
      }
      // res.sendFile(__dirname+'/userpage.html');
    }else{
      // res.send('communication error');
      console.log('communication error');
    }
  });
});

io.on('connection', socket => {
  console.log('socket.id:' + socket.id);
  io.to(socket.id).emit('message', 'which?');
  socket.on('message', message => {
    // console.log(message);
    if(message == 'qr'){
      id = socket.id;
    }else if(message == 'user'){
      connection.query(`SELECT temperature, createdAt FROM Temperatures WHERE number = ${num.number}`, (err,rows) => {
        if(err) throw err;
    
        io.to(socket.id).emit('message', rows);
      });    
    }
  });

  // connection.connect((err) => {
  //   if(err) throw err;
  //   console.log('Connected!');
  // });

  //connection.query('SELECT temperature, createdAt FROM Temperatures WHERE number = ' + num.number, (err,rows) => {
  // io.to(socket.id).emit('message', rows);
  // 切断時に発生します.
  socket.on('disconnect', reason => {
    console.log(`disconnect: %s, %s`, reason, socket.id);
    // connection.end();
  });
});

// HTTPサーバを起動する
http.listen(PORT, () => {
  console.log(`listening at http://localhost:${PORT}`);
});
