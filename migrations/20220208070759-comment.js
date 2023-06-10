'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
      return queryInterface.sequelize.transaction(function(t) {
        return Promise.all([
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
          }), {transaction: t}
        ])
      })
      },

  async down (queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(function(t) {
      return Promise.all([
        queryInterface.dropTable("comment"),
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
