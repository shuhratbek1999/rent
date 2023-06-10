'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('user', [
      {
        name: 'Admin',
        phone_number: "+998991234567",
        password: "$2a$12$z4syxHJjl7f/P3bYRt6DGOT7NFZODTpBTc3GL.ZfASHrcmFJc1U0W",
        role: 'Admin'
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('user', null, {});
  }
};
