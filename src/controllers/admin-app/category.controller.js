const {
	Category,
	CategoryFields,
	MainCategory,
	Subcategory,
	CategoryFieldDoc,
	Elon,
	Images,
	ElonExtra,
} = require('../../../models/init-models');
const HttpException = require('../../utils/HttpException.utils');
const { validationResult } = require('express-validator');

/******************************************************************************
 *                              Category Controller
 ******************************************************************************/
class CategoryController {
	oneCategoryByName = async (req, res, next) => {
		// console.log(req.params);
		const model = await Category.findOne({
			where: {
				name: req.params.name,
			},
			include: [
				{
					model: Elon,
					as: 'elons',
					where: {
						status: 'tasdiqlangan',
					},
					include: [
						{ model: Images, as: 'images', attributes: ['url'] },
						{ model: ElonExtra, as: 'elonExtra' },
					],
				},
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
			],
		});
		res.status(200).send({
			success: true,
			error_code: 200,
			message: 'information is out',
			data: model,
		});
	};
	mainCatAll = async (req, res, next) => {
		const model = await MainCategory.findAll({
			include: [
				{
					model: Subcategory,
					as: 'subcategories',
					include: [
						{
							model: Category,
							as: 'categories',
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
	getAll = async (req, res, next) => {
		const model = await Category.findAll();
		res.status(200).send({
			success: true,
			error_code: 200,
			message: 'information is out',
			data: model,
		});
	};
	getOne = async (req, res, next) => {
		try {
			const model = await Category.findOne({
				where: {
					id: req.params.id,
				},
				include: [
					{
						model: CategoryFieldDoc,
						as: 'field_doc',
						include: [{ model: CategoryFields, as: 'fields' }],
					},
				],
			});
			let CategoryAll = [],
				newObj = {};
			if (model && model.field_doc) {
				CategoryAll = model.field_doc.flatMap(doc => doc.fields);
			}
			newObj.name = model.name;
			newObj.sub_cat_id = model.sub_cat_id;
			newObj.fields = CategoryAll;
			if (!model) {
				throw new HttpException(404, 'category not found');
			}
			res.status(200).send({
				success: true,
				error_code: 200,
				message: 'informations is out',
				data: newObj,
			});
		} catch (err) {
			console.log(err);
		}
	};
	create = async (req, res, next) => {
		try {
			this.checkValidation(req);
			const { name, sub_cat_id, fields } = req.body;
			const model = await Category.create({
				name,
				sub_cat_id,
			});
			this.#fields(model, fields);
			res.status(200).send({
				success: true,
				error_code: 200,
				message: 'information added',
				data: model,
			});
		} catch (err) {
			console.log(err);
		}
	};
	update = async (req, res, next) => {
		try {
			const { name, sub_cat_id, fields } = req.body;
			const model = await Category.findOne({
				where: {
					id: req.params.id,
				},
			});
			if (!model) {
				throw new HttpException(404, 'category not found');
			}
			model.name = name;
			model.sub_cat_id = sub_cat_id;
			model.save();
			// console.log(fields);
			this.#fields(model, fields, false);
			res.status(200).send({
				success: true,
				error_code: 200,
				message: 'Information update',
				data: model,
			});
		} catch (err) {
			console.log(err);
		}
	};
	#fields = async (model, fields, create = true) => {
		try {
			if (!create) {
				await this.#deleteField(model.id);
			}
			for (let key of fields) {
				let field = {
					cat_id: model.id,
					field_id: key,
				};
				await CategoryFieldDoc.create(field);
			}
		} catch (err) {
			console.log(err);
		}
	};
	#deleteField = async doc_id => {
		await CategoryFieldDoc.destroy({ where: { cat_id: doc_id } });
	};
	delete = async (req, res, next) => {
		try {
			await this.#deleteField(req.params.id);
			const model = await Category.destroy({
				where: {
					id: req.params.id,
				},
			});
			if (!model) {
				throw new HttpException(404, 'category not found');
			} else {
				res.status(200).send({
					success: true,
					error_code: 200,
					message: 'information delete',
					data: model,
				});
			}
		} catch (err) {
			console.log(err);
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
module.exports = new CategoryController();
