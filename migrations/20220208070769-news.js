'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
          queryInterface.createTable("news", {
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
            aftor:{
              type: Sequelize.STRING
            },
            text:{
              type: Sequelize.TEXT,
              allowNull: false
            },
            datetime:{
              type: Sequelize.INTEGER,
              allowNull: false
            }
          })
      },

  async down (queryInterface, Sequelize) {
        queryInterface.dropTable("news")
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
