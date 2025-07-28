const { Comment } = require('../../../models/init-models');
const HttpException = require('../../utils/HttpException.utils');
const { validationResult } = require('express-validator');

/******************************************************************************
 *                              Comment Controller
 ******************************************************************************/
class CommentController {
	getAll = async (req, res, next) => {
		const model = await Comment.findAll();
		res.status(200).send({
			success: true,
			error_code: 200,
			message: 'Malumotlar chiqdi',
			data: model,
		});
	};
	getOne = async (req, res, next) => {
		const model = await Comment.findOne({
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
	create = async (req, res, next) => {
		try {
			// this.checkValidation(req);
			const { comment_text, elon_id, rating, name } = req.body;
			if (!req.currentUser) {
				throw new HttpException(404, 'foydalanuvchi topilmadi!');
			}
			let created_at = Math.floor(new Date().getTime() / 1000),
				user_id = req.currentUser.id;
			const modell = await Comment.create({
				comment_text,
				user_id,
				elon_id,
				rating,
				name,
				created_at,
			});
			res.status(200).send({
				success: true,
				error_code: 200,
				message: "Malumotlar qo'shildi",
				data: modell,
			});
		} catch (err) {
			next(err);
		}
	};
	update = async (req, res, next) => {
		const { comment_text, elon_id, rating, name } = req.body;
		let created_at = Math.floor(new Date().getTime() / 1000),
			user_id = req.currentUser.id;
		const model = await Comment.findOne({
			where: {
				id: req.params.id,
			},
		});
		model.name = name;
		model.comment_text = comment_text;
		model.elon_id = elon_id;
		model.rating = rating;
		model.user_id = user_id;
		model.created_at = created_at;
		model.save();
		res.status(200).send({
			success: true,
			error_code: 200,
			message: 'Malumotlar tahrirlandi',
			data: model,
		});
	};
	delete = async (req, res, next) => {
		const model = await Comment.destroy({
			where: {
				id: req.params.id,
			},
		});
		if (!model) {
			throw new HttpException(404, 'bunday id yoq');
		} else {
			res.status(200).send({
				success: true,
				error_code: 200,
				message: 'Malumot ochirildi',
				data: model,
			});
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
module.exports = new CommentController();
