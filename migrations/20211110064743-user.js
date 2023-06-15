'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
          queryInterface.createTable("user", {
            id:{
              type: Sequelize.INTEGER,
              autoIncrement: true,
              allowNull: false,
              primaryKey: true
            },
            name:{
              type: Sequelize.STRING,
              allowNull: false
            },
            phone_number:{
              type: Sequelize.STRING
            },
            password:{
              type: Sequelize.STRING,
              allowNull: false
            },
            role:{
              type: Sequelize.STRING
            },
            token:{
              type: Sequelize.STRING
            }
          })
      },

  async down (queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(function(t) {
      return Promise.all([
        queryInterface.dropTable("user"),
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
