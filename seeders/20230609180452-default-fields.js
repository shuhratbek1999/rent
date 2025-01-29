'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert(
			'category_fields',
			[
				{
					field_name: 'hajmi',
					field_type: 'number',
					is_required: true,
				},
				{
					field_name: 'bolalar bilan mumkin',
					field_type: 'checkbox',
					is_required: true,
				},
				{
					field_name: 'chekishga ruxsat berilgan',
					field_type: 'checkbox',
					is_required: true,
				},
				{
					field_name: 'uy xayvonlariga ruxsat beriladi',
					field_type: 'checkbox',
					is_required: true,
				},
				{
					field_name: 'mikrotolqinli pech',
					field_type: 'checkbox',
					is_required: true,
				},
				{
					field_name: 'xavfsizlik',
					field_type: 'checkbox',
					is_required: true,
				},
				{
					field_name: 'Plita',
					field_type: 'checkbox',
					is_required: true,
				},
				{
					field_name: 'Muzlatgich',
					field_type: 'checkbox',
					is_required: true,
				},
				{
					field_name: 'Wi-fi',
					field_type: 'checkbox',
					is_required: true,
				},
				{
					field_name: 'Televizor',
					field_type: 'checkbox',
					is_required: true,
				},
				{
					field_name: 'konditsioner',
					field_type: 'checkbox',
					is_required: true,
				},
				{
					field_name: 'Xammom',
					field_type: 'checkbox',
					is_required: true,
				},
				{
					field_name: 'Kir yuvish mashinasi',
					field_type: 'checkbox',
					is_required: true,
				},
				{
					field_name: 'Hovuz',
					field_type: 'checkbox',
					is_required: true,
				},
				{
					field_name: 'Bilyard',
					field_type: 'checkbox',
					is_required: true,
				},
				{
					field_name: 'Tennis kort',
					field_type: 'checkbox',
					is_required: true,
				},
				{
					field_name: 'Futbol maydoni',
					field_type: 'checkbox',
					is_required: true,
				},
				{
					field_name: 'Karaoke',
					field_type: 'checkbox',
					is_required: true,
				},
				{
					field_name: 'Stol tennisi',
					field_type: 'checkbox',
					is_required: true,
				},
				{
					field_name: 'Xonalar soni',
					field_type: 'number',
					is_required: true,
				},
				{
					field_name: 'Umumiy maydoni',
					field_type: 'number',
					is_required: true,
				},
				{
					field_name: 'yashash maydoni',
					field_type: 'number',
					is_required: true,
				},
				{
					field_name: 'oshxona maydoni',
					field_type: 'number',
					is_required: true,
				},
				{
					field_name: 'qavat',
					field_type: 'number',
					is_required: true,
				},
				{
					field_name: 'bina turi',
					field_type: 'text',
					is_required: true,
				},
				{
					field_name: 'qurilgan yili',
					field_type: 'number',
					is_required: true,
				},
				{
					field_name: 'Internet',
					field_type: 'checkbox',
					is_required: true,
				},
				{
					field_name: 'telefon',
					field_type: 'checkbox',
					is_required: true,
				},
				{
					field_name: 'Kasalxona,klinika',
					field_type: 'checkbox',
					is_required: true,
				},
				{
					field_name: 'Bolalar bogchasi',
					field_type: 'checkbox',
					is_required: true,
				},
				{
					field_name: 'Restoranlar,kafelar',
					field_type: 'checkbox',
					is_required: true,
				},
				{
					field_name: 'Maktab',
					field_type: 'checkbox',
					is_required: true,
				},
				{
					field_name: 'Shaharda',
					field_type: 'checkbox',
					is_required: true,
				},
				{
					field_name: 'Shahar chekkasida',
					field_type: 'checkbox',
					is_required: true,
				},
				{
					field_name: 'Hovuz,daryo yaqinida',
					field_type: 'checkbox',
					is_required: true,
				},
				{
					field_name: 'Mebel bilan jihozlangan',
					field_type: 'checkbox',
					is_required: true,
				},
				{
					field_name: 'Mualliflik loyihasi',
					field_type: 'checkbox',
					is_required: true,
				},
				{
					field_name: "O'rta tamirlash",
					field_type: 'checkbox',
					is_required: true,
				},
				{
					field_name: 'Tugallanmagan',
					field_type: 'checkbox',
					is_required: true,
				},
				{
					field_name: 'Tamirlash kerak',
					field_type: 'checkbox',
					is_required: true,
				},
				{
					field_name: 'Uy turi',
					field_type: 'select',
					is_required: true,
				},
				{
					field_name: 'Tugallanmagan',
					field_type: 'checkbox',
					is_required: true,
				},
				{
					field_name: 'Suv uyda',
					field_type: 'checkbox',
					is_required: true,
				},
				{
					field_name: 'Gaz uyda',
					field_type: 'checkbox',
					is_required: true,
				},
				{
					field_name: 'Elektr uyda',
					field_type: 'checkbox',
					is_required: true,
				},
				{
					field_name: 'Yer maydoni',
					field_type: 'number',
					is_required: true,
				},
				{
					field_name: 'Yer turi',
					field_type: 'text',
					is_required: true,
				},
				{
					field_name: 'Kanalizatsiya',
					field_type: 'checkbox',
					is_required: true,
				},
				{
					field_name: "Ish haqi oralig'i",
					field_type: 'text',
					is_required: true,
				},
				{
					field_name: 'Ish turi',
					field_type: 'text',
					is_required: true,
				},
				{
					field_name: 'Masofaviy ish',
					field_type: 'checkbox',
					is_required: true,
				},
				{
					field_name: 'Bandlik turi',
					field_type: 'text',
					is_required: true,
				},
				{
					field_name: 'Onlayn ishga qabul qilish',
					field_type: 'checkbox',
					is_required: true,
				},
				{
					field_name: 'Lavozim',
					field_type: 'text',
					is_required: true,
				},
				{
					field_name: 'Zoti',
					field_type: 'text',
					is_required: true,
				},
				{
					field_name: 'Telefon markasi',
					field_type: 'text',
					is_required: true,
				},
				{
					field_name: 'Ekran diagonali',
					field_type: 'text',
					is_required: true,
				},
				{
					field_name: 'Noutbuk brendi',
					field_type: 'text',
					is_required: true,
				},
				{
					field_name: 'Monitor brendi',
					field_type: 'text',
					is_required: true,
				},
			],
			{}
		);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete('main_category', null, {});
	},
};
