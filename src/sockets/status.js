const sequelize = require('sequelize');
const { Elon } = require('../../models/init-models');
const {} = require('../controllers/admin-app/elon.controller');
module.exports = (io, socket) => {
	socket.on('updateStatus', async id => {
		const elon = await Elon.findOne({
			where: {
				id: id,
			},
		});
		elon.status = 'tasdiqlangan';
		await elon.save();
		await io.emit('newElon');
	});
};
