const express = require('express');
const cors = require('cors');
const errorMiddleware = require('../middleware/error.middleware');
const userRouter = require('../routes/admin-app/user.route');
const elonRouter = require('../routes/admin-app/elon.route');
const categoryRouter = require('../routes/admin-app/category.route');
const SubcategoryRouter = require('../routes/admin-app/Subcategory.route');
const fieldsRouter = require('../routes/admin-app/fields.route');
const CommentRouter = require('../routes/admin-app/comment.route');
const HttpException = require('../utils/HttpException.utils');

module.exports = function (app) {
	// parse requests of content-type: application/json
	// parses incoming requests with JSON payloads
	app.use(express.json());
	// enabling cors for all requests by using cors middleware
	app.use(cors());
	// Enable pre-flight
	app.options('*', cors());
	app.use(`/api/v1/admin-app/user`, userRouter);
	app.use(`/api/v1/admin-app/comment`, CommentRouter);
	app.use(`/api/v1/admin-app/fields`, fieldsRouter);
	app.use(`/api/v1/admin-app/elon`, elonRouter);
	app.use(`/api/v1/admin-app/category`, categoryRouter);
	app.use(`/api/v1/admin-app/Subcategory`, SubcategoryRouter);

	// app.use(`/api/v1/uploads`, express.static('uploads'));
	app.use(`/api/v1/admin-app/img`, express.static('upload'));

	// 404 error
	app.all('*', (req, res, next) => {
		const err = new HttpException(404, 'Endpoint Not Found');
		next(err);
	});

	app.use(errorMiddleware);
};
