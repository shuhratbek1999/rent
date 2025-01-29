'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('user', [
      {
        name: 'Admin',
        email: "shuhratbekzokirjonov1119@gmail.com",
        password: "$2a$08$uKREF21uRz0GE5BBO7Cq6.8/PclJsFt5S94K7H/UAXVSeVugMF8Vu",
        role: 'Admin'
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('user', null, {});
  }
};
