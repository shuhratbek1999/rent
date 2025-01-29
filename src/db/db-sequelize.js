const { Sequelize } = require('sequelize');
const config = require('../startup/config');
const logging = config.node_env === 'production' ? false : console.log;
const db_sequelize = new Sequelize(
	config.db_name,
	config.db_user,
	config.db_pass,
	{
		host: config.host,
		port: config.db_port,
		dialect: 'mysql',
		logging,
		define: {
			timestamps: false,
		},
		dialectOptions: {
			decimalNumbers: true,
		},
	}
);
//  db_sequelize.sync({force: true});

module.exports = db_sequelize;
