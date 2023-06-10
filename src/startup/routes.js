const express = require("express");
const cors = require("cors");
const path = require("path");
const errorMiddleware = require('../middleware/error.middleware');
const userRouter = require('../routes/admin-app/user.route');
const commentRouter = require('../routes/admin-app/comment.route');
const newsRouter = require('../routes/admin-app/news.route');
const teacherRouter = require('../routes/admin-app/teacher.route');
const HttpException = require('../utils/HttpException.utils');

module.exports = function(app){
        // parse requests of content-type: application/json
        // parses incoming requests with JSON payloads
        app.use(express.json());
        // enabling cors for all requests by using cors middleware
        app.use(cors());
        // Enable pre-flight
        app.options("*", cors());
        app.use(`/api/v1/admin-app/user`, userRouter);
        app.use(`/api/v1/admin-app/comment`, commentRouter);
        app.use(`/api/v1/admin-app/news`, newsRouter);
        app.use(`/api/v1/admin-app/teacher`, teacherRouter);

        // app.use(`/api/v1/uploads`, express.static('uploads'));
        app.use(`/api/v1/admin-app/`, express.static('upload'));

        // 404 error
        app.all('*', (req, res, next) => {
            const err = new HttpException(404, 'Endpoint Not Found');
            next(err);
        });
        
        app.use(errorMiddleware);
}