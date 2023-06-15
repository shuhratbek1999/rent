'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
          queryInterface.createTable("comment", {
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
            news_id:{
              type: Sequelize.INTEGER
            }
          })
      },

  async down (queryInterface, Sequelize) {
        queryInterface.dropTable("comment")

    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
