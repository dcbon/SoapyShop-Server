'use strict';

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
    await queryInterface.bulkInsert('Products', [
      {
        name: 'NorskSoapery Chamomille infused All natural vegan',
        image_url: 'https://i.etsystatic.com/11232327/d/il/16cde3/2314399597/il_340x270.2314399597_c2zd.jpg?version=0',
        price: 95000,
        stock: 50,
        CategoryId: 1,
        createdAt: new Date (),
        updatedAt: new Date ()
      },
      {
        name: 'NorskSoapery Norwegian organic fjord',
        image_url: 'https://i.etsystatic.com/11232327/d/il/908bbf/2472158957/il_340x270.2472158957_jh4c.jpg?version=0',
        price: 195000,
        stock: 50,
        CategoryId: 2,
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
    await queryInterface.bulkDelete('Products', null, {});
  }
};
