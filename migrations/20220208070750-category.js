'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		queryInterface.createTable('category', {
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
			sub_cat_id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: 'subCategory',
					key: 'id',
				},
			},
		});
	},

	async down(queryInterface, Sequelize) {
		queryInterface.dropTable('category');
	},
};
