'use strict';
const bcrypt = require('bcrypt');

module.exports = {
  up: (queryInterface, Sequelize) => {
    const now = new Date();
    return queryInterface.bulkInsert('Users', [
      {
        number: 2021301,
        password: bcrypt.hashSync('pass', bcrypt.genSaltSync(8)),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        number: 2021302,
        password: bcrypt.hashSync('pass', bcrypt.genSaltSync(8)),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        number: 2021303,
        password: bcrypt.hashSync('pass', bcrypt.genSaltSync(8)),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        number: 2021304,
        password: bcrypt.hashSync('pass', bcrypt.genSaltSync(8)),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        number: 2021305,
        password: bcrypt.hashSync('pass', bcrypt.genSaltSync(8)),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        number: 2021306,
        password: bcrypt.hashSync('pass', bcrypt.genSaltSync(8)),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        number: 2021307,
        password: bcrypt.hashSync('pass', bcrypt.genSaltSync(8)),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        number: 2021308,
        password: bcrypt.hashSync('pass', bcrypt.genSaltSync(8)),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        number: 2021309,
        password: bcrypt.hashSync('pass', bcrypt.genSaltSync(8)),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        number: 2021310,
        password: bcrypt.hashSync('pass', bcrypt.genSaltSync(8)),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        number: 2021311,
        password: bcrypt.hashSync('pass', bcrypt.genSaltSync(8)),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        number: 2021312,
        password: bcrypt.hashSync('pass', bcrypt.genSaltSync(8)),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        number: 2021313,
        password: bcrypt.hashSync('pass', bcrypt.genSaltSync(8)),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        number: 2021314,
        password: bcrypt.hashSync('pass', bcrypt.genSaltSync(8)),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        number: 2021315,
        password: bcrypt.hashSync('pass', bcrypt.genSaltSync(8)),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        number: 2021316,
        password: bcrypt.hashSync('pass', bcrypt.genSaltSync(8)),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        number: 20213117,
        password: bcrypt.hashSync('pass', bcrypt.genSaltSync(8)),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        number: 2021318,
        password: bcrypt.hashSync('pass', bcrypt.genSaltSync(8)),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        number: 2021319,
        password: bcrypt.hashSync('pass', bcrypt.genSaltSync(8)),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        number: 2021320,
        password: bcrypt.hashSync('pass', bcrypt.genSaltSync(8)),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        number: 2021321,
        password: bcrypt.hashSync('pass', bcrypt.genSaltSync(8)),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        number: 2021322,
        password: bcrypt.hashSync('pass', bcrypt.genSaltSync(8)),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        number: 2021323,
        password: bcrypt.hashSync('pass', bcrypt.genSaltSync(8)),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        number: 2021324,
        password: bcrypt.hashSync('pass', bcrypt.genSaltSync(8)),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        number: 2021325,
        password: bcrypt.hashSync('pass', bcrypt.genSaltSync(8)),
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
