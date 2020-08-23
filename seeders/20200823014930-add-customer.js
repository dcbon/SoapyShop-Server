'use strict';
const { hashPass } = require('../helpers/bcrypt')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('Users', [
      {
        email: 'john@soapyshop.com',
        password: hashPass('secretpassword'),
        role: 'customer',
        createdAt: new Date (),
        updatedAt: new Date ()
      },
      {
        email: 'jane@soapyshop.com',
        password: hashPass('secretpassword'),
        role: 'customer',
        createdAt: new Date (),
        updatedAt: new Date ()
      }
    ])
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Users', null, {});
  }
};
