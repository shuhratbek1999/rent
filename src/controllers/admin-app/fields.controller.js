const { CategoryFields } = require('../../../models/init-models');
const HttpException = require('../../utils/HttpException.utils');
const { validationResult } = require('express-validator');

/******************************************************************************
 *                              Fields Controller
 ******************************************************************************/
class FieldsController {
	getAll = async (req, res, next) => {
		const model = await CategoryFields.findAll();
		res.status(200).send({
			success: true,
			error_code: 200,
			message: 'Malumotlar chiqdi',
			data: model,
		});
	};
	getOne = async (req, res, next) => {
		const model = await CategoryFields.findOne({
			where: {
				id: req.params.id,
			},
		});
		if (!model) {
			throw new HttpException(404, "bu id da malumot yo'q");
		}
		res.status(200).send({
			success: true,
			error_code: 200,
			message: 'Malumot chiqdi',
			data: model,
		});
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
module.exports = new FieldsController();
