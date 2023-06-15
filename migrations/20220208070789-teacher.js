'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
          queryInterface.createTable("teacher", {
            id:{
              type: Sequelize.INTEGER,
              autoIncrement: true,
              allowNull: false,
              primaryKey: true
            },
            name:{
              type: Sequelize.TEXT,
              allowNull: false
            },
            image:{
              type: Sequelize.STRING
            },
            lavozimi:{
              type: Sequelize.STRING
            },
            toifasi:{
              type: Sequelize.TEXT,
              allowNull: false
            },
            phone:{
              type: Sequelize.STRING,
              allowNull: false
            },
            email:{
              type: Sequelize.STRING,
            },
            tajribasi:{
              type: Sequelize.STRING,
            },
            fan:{
              type: Sequelize.STRING
            }
          })
      },

  async down (queryInterface, Sequelize) {
        queryInterface.dropTable("teacher")
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
