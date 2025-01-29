'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('category_field_doc', {
			id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
			},
			sub_id: {
				type: Sequelize.INTEGER,
				allowNull: true,
			},
			cat_id: {
				type: Sequelize.INTEGER,
				allowNull: true,
			},
			field_id: {
				type: Sequelize.INTEGER,
				allowNull: false,
			},
		});
	},
};
