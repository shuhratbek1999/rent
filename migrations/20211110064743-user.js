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
            email:{
              type: Sequelize.STRING,
              unique: true,
              allowNull: false
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
        queryInterface.dropTable("user")
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
