const {
	Subcategory,
	MainCategory,
	CategoryFieldDoc,
	Category,
	CategoryFields,
	Elon,
	Images,
	ElonExtra,
} = require('../../../models/init-models');
const HttpException = require('../../utils/HttpException.utils');
const { validationResult } = require('express-validator');
const sequelize = require('sequelize');

/******************************************************************************
 *                              Subcategory Controller
 ******************************************************************************/
class SubcategoryController {
	// subcategory name orqali elonlarni olish
	SubCategoryNameList = async (req, res, next) => {
		const model = await Subcategory.findOne({
			where: {
				name: req.params.name,
			},
			include: [
				{
					model: Elon,
					as: 'elon',
					where: {
						status: 'tasdiqlangan',
					},
					include: [
						{ model: Images, as: 'images', attributes: ['url'] },
						{ model: Category, as: 'category', attributes: ['name'] },
						{ model: ElonExtra, as: 'elonExtra' },
					],
				},
				{
					model: Category,
					as: 'categories',
					attributes: ['id', 'name'],
					include: [
						{
							model: CategoryFieldDoc,
							as: 'field_doc',
							attributes: ['id'],
							include: [
								{
									model: CategoryFields,
									as: 'fields',
								},
							],
						},
						{
							model: Elon,
							as: 'elons',
							where: {
								status: 'tasdiqlangan',
							},
							include: [
								{ model: Images, as: 'images', attributes: ['url'] },
								{ model: Category, as: 'category', attributes: ['name'] },
								{ model: ElonExtra, as: 'elonExtra' },
							],
						},
					],
				},
			],
		});
		res.status(200).send({
			success: true,
			error_code: 200,
			message: 'information is out',
			data: model,
		});
	};
	//about qismi uchun api bitta elonni hamma tavsifi
	categoryElon = async (req, res, next) => {
		const model = await MainCategory.findAll({
			where: {
				name: req.query.name,
			},
			include: [
				{
					model: Subcategory,
					as: 'subcategories',
					include: [
						{
							model: Elon,
							as: 'elon',
							where: {
								status: 'tasdiqlangan',
								id: { [sequelize.Op.ne]: req.query.id },
							},
							include: [
								{ model: Images, as: 'images', attributes: ['url'] },
								{ model: Category, as: 'category', attributes: ['name'] },
							],
						},
					],
				},
			],
		});
		res.status(200).send({
			success: true,
			error_code: 200,
			message: 'information is out',
			data: model,
		});
	};
	elonAll = async (req, res, next) => {
		try {
			let model = await MainCategory.findAll({
				include: [
					{
						model: Subcategory,
						as: 'subcategories',
						include: [
							{
								model: Category,
								as: 'categories',
								include: [
									{
										model: Elon,
										as: 'elons',
										where: {
											status: 'tasdiqlangan',
										},
										required: false,
										include: [
											{ model: Images, as: 'images', attributes: ['url'] },
											{ model: Category, as: 'category', attributes: ['name'] },
										],
									},
								],
							},
							{
								model: Elon,
								as: 'elon',
								where: {
									status: 'tasdiqlangan',
								},
								required: false,
								include: [
									{ model: Images, as: 'images', attributes: ['url'] },
									{ model: Category, as: 'category', attributes: ['name'] },
								],
							},
						],
					},
				],
				raw: false,
			});
			// const filterData = model.filter(sub => sub.subcategories.length > 0);
			const filterData = model.map(sub => {
				return {
					...sub.toJSON(),
					subcategories: sub.subcategories.filter(
						sub => sub.categories.length > 0
					),
				};
			});
			console.log(filterData);

			res.status(200).send({
				success: true,
				error_code: 200,
				message: 'information is out',
				data: model,
			});
			// console.log(filterData, 'errorr');
		} catch (err) {
			console.log(err);
			res.status(500).json({ message: 'xatolik yuz berdi', err });
		}
	};
	sub_id_fields_doc = async (req, res, next) => {
		try {
			const model = await Subcategory.findOne({
				where: {
					id: req.params.id,
				},
				include: [
					{
						model: Category,
						as: 'categories',
						include: [
							{
								model: CategoryFieldDoc,
								as: 'field_doc',
								include: [{ model: CategoryFields, as: 'fields' }],
							},
						],
					},
				],
			});
			let fieldsData = [];
			if (model && model.categories) {
				fieldsData = model.categories.flatMap(cat =>
					cat.field_doc.flatMap(doc => doc.fields)
				);
			}
			res.status(200).send({
				success: true,
				error_code: 200,
				message: 'information is out',
				data: fieldsData,
			});
		} catch (err) {
			res.status(500).json({ message: 'xatolik roy berdi', err });
		}
	};
	mainCategory = async (req, res, next) => {
		const model = await MainCategory.findAll();
		res.status(200).send({
			success: true,
			error_code: 200,
			message: 'information is out',
			data: model,
		});
	};
	getAll = async (req, res, next) => {
		const model = await Subcategory.findAll({
			attributes: [
				'id',
				'name',
				[sequelize.literal('main_cat.name'), 'category_name'],
			],
			include: [{ model: MainCategory, as: 'main_cat' }],
		});
		res.status(200).send({
			success: true,
			error_code: 200,
			message: 'information is out',
			data: model,
		});
	};
	getOne = async (req, res, next) => {
		const model = await Subcategory.findOne({
			where: {
				id: req.params.id,
			},
			include: [{ model: MainCategory, as: 'main_cat' }],
		});
		if (!model) {
			throw new HttpException(404, 'Subcategory not found');
		}
		res.status(200).send({
			success: true,
			error_code: 200,
			message: 'informations is out',
			data: model,
		});
	};
	create = async (req, res, next) => {
		try {
			this.checkValidation(req);
			const { name, main_cat_id, fields } = req.body;
			const model = await Subcategory.create({
				name,
				main_cat_id,
			});
			this.#fields(model, fields);
			res.status(200).send({
				success: true,
				error_code: 200,
				message: 'information added',
				data: model,
			});
		} catch (err) {
			res.status(500).json({ message: 'xatolik yuz berdi', err });
		}
	};
	update = async (req, res, next) => {
		try {
			const { name, main_cat_id, fields } = req.body;
			const model = await Subcategory.findOne({
				where: {
					id: req.params.id,
				},
			});
			if (!model) {
				throw new HttpException(404, 'Subcategory not found');
			}
			model.name = name;
			model.main_cat_id = main_cat_id;
			model.save();
			this.#fields(model, fields, false);
			res.status(200).send({
				success: true,
				error_code: 200,
				message: 'Information update',
				data: model,
			});
		} catch (err) {
			res.status(500).json({ message: 'xatolik yuz berdi', err });
		}
	};
	#fields = async (model, fields, create = true) => {
		try {
			if (!create) {
				await this.#deleteField(model.id);
			}
			for (let key of fields) {
				let field = {
					field_id: model.id,
					sub_id: key.sub_id,
				};
				await CategoryFieldDoc.create(field);
			}
		} catch (err) {
			res.status(500).json({ message: 'xatolik yuz berdi', err });
		}
	};
	#deleteField = async doc_id => {
		await CategoryFieldDoc.destroy({ where: { sub_id: doc_id } });
	};
	delete = async (req, res, next) => {
		try {
			const model = await Subcategory.destroy({
				where: {
					id: req.params.id,
				},
			});
			if (!model) {
				throw new HttpException(404, 'Subcategory not found');
			} else {
				res.status(200).send({
					success: true,
					error_code: 200,
					message: 'information delete',
					data: model,
				});
			}
		} catch (err) {
			res.status(500).json({ message: 'xatolik yuz berdi', err });
		}
	};
	checkValidation = req => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			throw new HttpException(400, 'Validation faild', errors);
		}
	};
}

/******************************************************************************
 *                               Export
 ******************************************************************************/
module.exports = new SubcategoryController();
