const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Subcategory', {
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
    main_cat_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'main_category',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'subcategory',
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
        name: "main_cat_id",
        using: "BTREE",
        fields: [
          { name: "main_cat_id" },
        ]
      },
    ]
  });
};
