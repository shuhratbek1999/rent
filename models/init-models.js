var DataTypes = require("sequelize").DataTypes;
const sequelize = require('../src/db/db-sequelize');
var _Comment = require("./comment");
var _News = require("./news");
var _Sequelizemeta = require("./sequelizemeta");
var _Teacher = require("./teacher");
var _User = require("./user");

  var Comment = _Comment(sequelize, DataTypes);
  var News = _News(sequelize, DataTypes);
  var Sequelizemeta = _Sequelizemeta(sequelize, DataTypes);
  var Teacher = _Teacher(sequelize, DataTypes);
  var User = _User(sequelize, DataTypes);

  // News.belongsTo(Comment, { as: "comment", foreignKey: "comment_id"});
  // Comment.hasMany(News, { as: "newss", foreignKey: "comment_id"});

  module.exports = {
    Comment,
    News,
    Sequelizemeta,
    Teacher,
    User,
  };
