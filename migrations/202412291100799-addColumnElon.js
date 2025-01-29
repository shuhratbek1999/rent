'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		queryInterface.addColumn('Elon', 'subcategory_id', {
			type: Sequelize.INTEGER,
			allowNull: false,
		});
	},

	async down(queryInterface, Sequelize) {
		queryInterface.removeColumn('Elon', 'subcategory_id');
	},
};
