'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert(
			'main_category',
			[
				{
					name: 'Bolalar dunyosi',
				},
				{
					name: "Ko'chmas mulk",
				},
				{
					name: 'Transport',
				},
				{
					name: 'Ish',
				},
				{
					name: 'Hayvonlar',
				},
				{
					name: 'Uy va jixozlar',
				},
				{
					name: 'Elektronika',
				},
				{
					name: 'Biznes va xizmatlar',
				},
				{
					name: 'Moda va uslub',
				},
				{
					name: 'Xobbi,dam olish va sport',
				},
			],
			{}
		);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete('main_category', null, {});
	},
};
