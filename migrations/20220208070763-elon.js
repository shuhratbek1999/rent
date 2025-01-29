'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		queryInterface.createTable('elon', {
			id: {
				type: Sequelize.INTEGER,
				autoIncrement: true,
				allowNull: false,
				primaryKey: true,
			},
			name: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			description: {
				type: Sequelize.TEXT,
				allowNull: false,
			},
			category_id: {
				type: Sequelize.INTEGER,
				allowNull: false,
			},
			create_at: {
				type: Sequelize.INTEGER,
				allowNull: false,
			},
			price: {
				type: Sequelize.DECIMAL(10, 2),
				allowNull: false,
			},
			status: {
				type: Sequelize.ENUM('tasdiqlangan', 'tasdiqlanmagan', 'rad etilgan'),
				allowNull: false,
			},
			user_id: {
				type: Sequelize.INTEGER,
				allowNull: false,
			},
			adress: {
				type: Sequelize.TEXT,
			},
			contact_name: {
				type: Sequelize.STRING,
			},
			email: {
				type: Sequelize.STRING,
				unique: true,
			},
			phone_number: {
				type: Sequelize.STRING,
			},
			updated: {
				type: Sequelize.BOOLEAN,
			},
		});
	},

	async down(queryInterface, Sequelize) {
		queryInterface.dropTable('elon');
	},
};
