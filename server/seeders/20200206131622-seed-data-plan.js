'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
   return queryInterface.bulkInsert('Plans',[
    {
      title: 'Jalan Jalan Men',
      province :'Sumatera Utara',
      city : 'Medan',
      date_plan: new Date(),
      itinerary: "Bla bla bla",
      transportation: "Pesawat",
      equipment: 'Tas',
      budget: '10000000',
      UserId: 1,
      createdAt : new Date(),
      updatedAt: new Date()
    }
  ],{})
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
     return queryInterface.bulkDelete('Plans', null, {});
  }
};
