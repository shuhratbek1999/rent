const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "Elon",
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      category_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      create_at: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      price: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM("tasdiqlangan", "tasdiqlanmagan", "rad etilgan"),
        allowNull: false,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      adress: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      contact_name: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      email: {
        type: DataTypes.STRING(255),
        allowNull: true,
        unique: "email",
      },
      phone_number: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      updated: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      foydalanish: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      holati: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      price_agreement: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      subcategory_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      pay_type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "elon",
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "id" }],
        },
        {
          name: "email",
          unique: true,
          using: "BTREE",
          fields: [{ name: "email" }],
        },
      ],
    }
  );
};
