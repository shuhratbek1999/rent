'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		queryInterface.createTable('main_category', {
			id: {
				type: Sequelize.INTEGER,
				autoIncrement: true,
				allowNull: false,
				primaryKey: true,
			},
			name: {
				type: Sequelize.TEXT,
				unique: true,
				allowNull: false,
			},
		});
	},

	async down(queryInterface, Sequelize) {
		queryInterface.dropTable('main_category');
	},
};
