'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
      return queryInterface.sequelize.transaction(function(t) {
        return Promise.all([
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
          }), {transaction: t}
        ])
      })
      },

  async down (queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(function(t) {
      return Promise.all([
        queryInterface.dropTable("teacher"),
        {transaction: t}
      ])
    })
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
