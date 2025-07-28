const { User, UserDate } = require('../../../models/init-models');
const HttpException = require('../../utils/HttpException.utils');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { secret_jwt } = require('../../startup/config');
const nodemailer = require('nodemailer');
/******************************************************************************
 *                              User Controller
 ******************************************************************************/
class UserController {
	// chatElon = async(req,res,next) => {
	// 	const model = await User.findOne()
	// }
	userLogin = async (req, res, next) => {
		try {
			this.checkValidation(req);
			const { email, password } = req.body;
			const user = await User.findOne({
				where: {
					email: email,
				},
			});

			if (!user) {
				throw new HttpException(401, 'Unable to login!');
			}

			const isMatch = await bcrypt.compare(password, user.password);

			if (!isMatch) {
				throw new HttpException(401, 'Incorrect password!');
			}
			//   console.log(user.id,"userID", user);
			// user matched!
			const token = jwt.sign({ user_id: user.id.toString() }, secret_jwt, {
				expiresIn: '1d',
			});
			// const decoded = jwt.decode(token);
			// console.log("Expired At:", new Date(decoded.exp * 1000))
			user.token = token;
			res.send({
				success: true,
				message: 'Success',
				data: user,
			});
		} catch (error) {
			next(error);
		}
	};
	getAll = async (req, res, next) => {
		const model = await User.findAll();
		res.status(200).send({
			error: false,
			error_code: 200,
			message: 'information is out',
			data: model,
		});
	};
	getOne = async (req, res, next) => {
		const model = await User.findOne({
			where: {
				id: req.params.id,
			},
		});
		if (!model) {
			throw new HttpException(404, 'id is not found');
		}
		res.status(200).send({
			error: false,
			error_code: 200,
			message: 'information is out',
			data: model,
		});
	};
	person = async (req, res, next) => {
		const model = await User.findOne({
			where: {
				id: req.currentUser.id,
			},
		});
		if (!model) {
			throw new HttpException(404, 'id is not found');
		}
		res.status(200).send({
			error: false,
			error_code: 200,
			message: 'information is out',
			data: model,
		});
	};
	create = async (req, res, next) => {
		this.checkValidation(req);
		await this.hashPassword(req);
		const { name, email, password, role } = req.body;
		let time = Math.floor(new Date().getTime() / 1000);
		const model = await User.create({
			name: name,
			email: email,
			password: password,
			role: role,
		});
		const userDate = {
			connect_date: time,
			down_date: time,
			user_id: model.id,
			isOnline: true,
		};
		await UserDate.create(userDate);
		res.status(200).send({
			error: false,
			error_code: 200,
			message: 'user added',
			data: model,
		});
	};
	reset = async (req, res, next) => {
		const { email, code } = req.body;
		const transport = nodemailer.createTransport({
			host: 'smtp.gmail.com',
			port: 465,
			secure: false,
			service: 'gmail',
			auth: {
				user: 'shuhratbekzokirjonov1119@gmail.com',
				pass: 'hlbevhmzkjhpiqzm',
			},
		});
		const mailOptions = {
			from: 'shuhratbekzokirjonov1119@gmail.com',
			to: email,
			subject: 'Tasdiqlash kodi',
			text: `sizning tasdiqlash kodingiz: ${code}`,
		};
		transport.sendMail(mailOptions, (error, info) => {
			if (error) {
				// console.error('Xato:', error);
				return res.status(500).json({ message: "Email jo'natishda xato" });
			}
			// console.log("Email jo'natildi:", info.response);
			res.json({ message: 'Kod muvaffaqiyatli yuborildi!' });
		});
		await this.hashPassword(req);
		try {
			let user = await User.findOne({
				where: {
					email: email,
				},
			});
			if (!user) {
				return res.status(404).send('User not found');
			}
			user.password = req.body.code;
			await user.save();
		} catch (error) {
			res.status(500).send('Error updating user: ' + error.message);
		}
	};
	update = async (req, res, next) => {
		let data = req.body;
		await this.hashPassword(req);
		const model = await User.findOne({
			where: {
				id: req.params.id,
			},
		});
		model.name = data.name;
		model.email = data.email;
		model.password = data.password;
		model.role = data.role;
		model.save();
		res.status(200).send({
			error: false,
			error_code: 200,
			message: 'user update',
			data: model,
		});
	};
	delete = async (req, res, next) => {
		const model = await User.destroy({
			where: {
				id: req.params.id,
			},
		});
		if (!model) {
			throw new HttpException(404, 'id not found');
		} else {
			res.status(200).send({
				error: false,
				error_code: 200,
				message: 'user delete',
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

	// hash password if it exists
	hashPassword = async req => {
		if (req.body.password) {
			req.body.password = await bcrypt.hash(req.body.password, 8);
		} else if (req.body.code) {
			req.body.code = await bcrypt.hash(req.body.code, 8);
		}
	};
}

/******************************************************************************
 *                               Export
 ******************************************************************************/
module.exports = new UserController();
