const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
	return sequelize.define(
		'Comment',
		{
			id: {
				autoIncrement: true,
				type: DataTypes.INTEGER,
				allowNull: false,
				primaryKey: true,
			},
			comment_text: {
				type: DataTypes.TEXT,
				allowNull: false,
			},
			user_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			elon_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				references: {
					model: 'elon',
					key: 'id',
				},
			},
			rating: {
				type: DataTypes.DECIMAL(10, 0),
				allowNull: false,
			},
			name: {
				type: DataTypes.STRING(255),
				allowNull: false,
			},
		},
		{
			sequelize,
			tableName: 'comment',
			timestamps: false,
			indexes: [
				{
					name: 'PRIMARY',
					unique: true,
					using: 'BTREE',
					fields: [{ name: 'id' }],
				},
				{
					name: 'elon_id',
					using: 'BTREE',
					fields: [{ name: 'elon_id' }],
				},
			],
		}
	);
};
