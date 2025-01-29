'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		queryInterface.addColumn('comment', 'rating', {
			type: Sequelize.DECIMAL,
			allowNull: false,
		});
	},

	async down(queryInterface, Sequelize) {
		queryInterface.removeColumn('comment', 'rating');
	},
};
