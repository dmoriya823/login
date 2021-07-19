require('dotenv').config()
const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('./models').User;

const mustacheExpress = require('mustache-express');
app.engine('mst', mustacheExpress());
app.set('view engine', 'mst');
app.set('views', __dirname + '/views');

passport.use(new LocalStrategy({
    usernameField: 'number',
    passwordField: 'password'
  }, (number, password, done) =>  {

    User.findOne({
      where: {
        number: number
      }
    })
    .then(user => {

      if(user && bcrypt.compareSync(password, user.password)) {
	  
        return done(null, user);  // ログイン成功

      }

      throw new Error();

    })
    .catch(error => { // エラー処理

      return done(null, false, { message: '認証情報と一致するレコードがありません。' });

    });
}));

// Session
passport.serializeUser((user, done) => {

  done(null, user);

});
passport.deserializeUser((user, done) => {

  done(null, user);

});

module.exports = passport;
