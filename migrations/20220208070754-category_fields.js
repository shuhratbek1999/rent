'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		queryInterface.createTable('category_fields', {
			id: {
				type: Sequelize.INTEGER,
				autoIncrement: true,
				allowNull: false,
				primaryKey: true,
			},
			field_name: {
				type: Sequelize.TEXT,
				allowNull: false,
			},
			field_type: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			is_required: {
				type: Sequelize.BOOLEAN,
				allowNull: false,
			},
		});
	},

	async down(queryInterface, Sequelize) {
		queryInterface.dropTable('category_fields');
	},
};
