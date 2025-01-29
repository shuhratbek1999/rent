const sequelize = require('sequelize');
const { UserDate } = require('../../models/init-models');
module.exports = async (io, socket, isTrue = true) => {
	try {
		const model = await UserDate.findOne({
			where: {
				user_id: socket.userId,
			},
		});
		let connectDate = new Date().toISOString();
		if (!isTrue && model) {
			model.down_date = connectDate;
			model.isOnline = false;
			model.save();
		} else if (model) {
			model.connect_date = connectDate;
			model.isOnline = true;
			model.save();
		}
	} catch (err) {
		console.log(err);
	}
};
