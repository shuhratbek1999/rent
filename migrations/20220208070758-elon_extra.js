'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		queryInterface.createTable('elon_extra', {
			id: {
				type: Sequelize.INTEGER,
				autoIncrement: true,
				allowNull: false,
				primaryKey: true,
			},
			elon_id: {
				type: Sequelize.INTEGER,
				allowNull: false,
			},
			field_id: {
				type: Sequelize.INTEGER,
				allowNull: false,
			},
			values: {
				type: Sequelize.STRING,
				allowNull: false,
			},
		});
	},

	async down(queryInterface, Sequelize) {
		queryInterface.dropTable('elon_extra');
	},
};
