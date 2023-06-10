'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
      return queryInterface.sequelize.transaction(function(t) {
        return Promise.all([
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
          }), {transaction: t}
        ])
      })
      },

  async down (queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(function(t) {
      return Promise.all([
        queryInterface.dropTable("news"),
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
