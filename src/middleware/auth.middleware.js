const HttpException = require('../utils/HttpException.utils');
const jwt = require('jsonwebtoken');
const { secret_jwt } = require('../startup/config');
const { User } = require('../../models/init-models');

const auth = (...roles) => {
	return async function (req, res, next) {
		// console.log('testlash');
		try {
			const authHeader = req.headers.authorization;
			const bearer = 'Bearer ';

			if (!authHeader || !authHeader.startsWith(bearer)) {
				throw new HttpException(401, 'Access denied. No credentials sent!');
			}

			const token = authHeader.replace(bearer, '');

			// Verify Token
			const decoded = jwt.verify(token, secret_jwt);

			const users = await User.findOne({
				where: { id: parseFloat(decoded.user_id) },
			});
			// console.log(users, 'userssssssss');
			// console.log('testlash');
			if (!users) {
				throw new HttpException(401, 'Authentication failed!');
			}

			// check if the current user is the owner user
			const ownerAuthorized = req.params.id == users.id;

			// if the current user is not the owner and
			// if the user role don't have the permission to do this action.
			// the user will get this error
			if (!ownerAuthorized && roles.length && !roles.includes(users.role)) {
				throw new HttpException(401, 'Unauthorized');
			}

			// if the user has permissions
			req.currentUser = users;
			next();
		} catch (e) {
			e.status = 401;
			next(e);
		}
	};
};

module.exports = auth;
