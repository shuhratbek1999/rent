'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
          queryInterface.createTable("Images", {
            id:{
              type: Sequelize.INTEGER,
              autoIncrement: true,
              allowNull: false,
              primaryKey: true
            },
            url:{
              type: Sequelize.TEXT,
              allowNull: false
            },
            doc_id:{
              type: Sequelize.INTEGER,
              allowNull: false
            }
          })
      },

  async down (queryInterface, Sequelize) {
        queryInterface.dropTable("Images")
  }
};
