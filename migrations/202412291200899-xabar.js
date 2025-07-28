"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    queryInterface.createTable("xabar", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      sender_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      receiverId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      message: {
        type: Sequelize.TEXT,
      },
      time: {
        type: Sequelize.INTEGER,
      },
      read: {
        type: Sequelize.BOOLEAN,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    queryInterface.dropTable("xabar");
  },
};
