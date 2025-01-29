const express = require('express');
const app = express();
require('./startup/logging')();
require('./startup/db')();
const { port } = require('./startup/config');
require('./startup/routes')(app);
const jwt = require('jsonwebtoken');
const Elon = require('../src/controllers/admin-app/elon.controller');
const server = app.listen(port, () =>
	console.log(`🚀 Server running on port ${port}!`)
);
const io = require('socket.io')(server, {
	allowEIO3: true,
	cors: {
		origin: true,
		methods: ['GET', 'POST'],
		credentials: true,
	},
});
io.use(async (socket, next) => {
	try {
		const token = socket.handshake.query.token;
		const payload = await jwt.verify(token, process.env.SECRET_JWT);
		socket.userId = payload.user_id;
		next();
	} catch (err) {}
});
const Status = require('./sockets/status');
const Date = require('./sockets/Date');
const onConnection = async socket => {
	// console.log(`connected ${socket.userId}`);
	Status(io, socket);
	Date(io, socket);
	Elon.socketConnect(io, socket);
	socket.on('disconnect', () => {
		Date(io, socket, false);
		// console.log(`disconnect ${socket.userId}`);
	});
};
io.on('connection', onConnection);
module.exports = server;
