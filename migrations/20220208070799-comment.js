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
            comment_text:{
              type: Sequelize.TEXT,
              allowNull: false
            },
            user_id:{
              type: Sequelize.INTEGER,
              allowNull: false
            },
            elon_id:{
              type: Sequelize.INTEGER,
              allowNull: false,
              references:{
                model: 'elon',
                key: 'id'
              },
              onDelete: 'RESTRICT',
              onUpdate: 'CASCADE'
            },
            created_at:{
              type: Sequelize.INTEGER,
              allowNull: false
            }
          })
      },

  async down (queryInterface, Sequelize) {
        queryInterface.dropTable("comment")
  }
};
