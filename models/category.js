const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Category', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: "name"
    },
    sub_cat_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'subcategory',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'category',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "name",
        unique: true,
        using: "HASH",
        fields: [
          { name: "name" },
        ]
      },
      {
        name: "sub_cat_id",
        using: "BTREE",
        fields: [
          { name: "sub_cat_id" },
        ]
      },
    ]
  });
};
