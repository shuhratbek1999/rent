var DataTypes = require('sequelize').DataTypes;
const sequelize = require('../src/db/db-sequelize');
var _Category = require('./category');
var _CategoryFieldDoc = require('./category_field_doc');
var _CategoryFields = require('./category_fields');
var _Comment = require('./comment');
var _Elon = require('./elon');
var _ElonExtra = require('./elon_extra');
var _Images = require('./images');
var _MainCategory = require('./main_category');
var _Sequelizemeta = require('./sequelizemeta');
var _Subcategory = require('./subcategory');
var _User = require('./user');
var _UserDate = require('./user_date');

var Category = _Category(sequelize, DataTypes);
var CategoryFieldDoc = _CategoryFieldDoc(sequelize, DataTypes);
var CategoryFields = _CategoryFields(sequelize, DataTypes);
var Comment = _Comment(sequelize, DataTypes);
var Elon = _Elon(sequelize, DataTypes);
var ElonExtra = _ElonExtra(sequelize, DataTypes);
var Images = _Images(sequelize, DataTypes);
var MainCategory = _MainCategory(sequelize, DataTypes);
var Sequelizemeta = _Sequelizemeta(sequelize, DataTypes);
var Subcategory = _Subcategory(sequelize, DataTypes);
var User = _User(sequelize, DataTypes);
var UserDate = _UserDate(sequelize, DataTypes);

Elon.belongsTo(Category, { as: 'category', foreignKey: 'category_id' });
Elon.belongsTo(Subcategory, {
	as: 'subcategory',
	foreignKey: 'subcategory_id',
});
Category.hasMany(Elon, { as: 'elons', foreignKey: 'category_id' });
// Category.hasMany(CategoryFields, { as: 'fields', foreignKey: 'cat_id' });
Comment.belongsTo(Elon, { as: 'comment', foreignKey: 'elon_id' });
Elon.hasMany(Comment, { as: 'comments', foreignKey: 'elon_id' });
User.hasMany(UserDate, { as: 'user_date', foreignKey: 'user_id' });
Elon.belongsTo(User, { as: 'user', foreignKey: 'user_id' });
Elon.hasMany(Images, { as: 'images', foreignKey: 'doc_id' });
Elon.hasMany(ElonExtra, { as: 'elonExtra', foreignKey: 'elon_id' });
ElonExtra.belongsTo(CategoryFields, {
	as: 'category_fields',
	foreignKey: 'field_id',
});
Subcategory.belongsTo(MainCategory, {
	as: 'main_cat',
	foreignKey: 'main_cat_id',
});
MainCategory.hasMany(Subcategory, {
	as: 'subcategories',
	foreignKey: 'main_cat_id',
});
Category.belongsTo(Subcategory, { as: 'sub_cat', foreignKey: 'sub_cat_id' });
Category.hasMany(CategoryFieldDoc, { as: 'field_doc', foreignKey: 'cat_id' });
Subcategory.hasMany(CategoryFieldDoc, {
	as: 'field_docs',
	foreignKey: 'sub_id',
});
Subcategory.hasMany(Category, { as: 'categories', foreignKey: 'sub_cat_id' });
Subcategory.hasMany(Elon, { as: 'elon', foreignKey: 'subcategory_id' });
CategoryFieldDoc.belongsTo(CategoryFields, {
	as: 'fields',
	foreignKey: 'field_id',
});

module.exports = {
	Category,
	CategoryFieldDoc,
	CategoryFields,
	Comment,
	Elon,
	ElonExtra,
	Images,
	MainCategory,
	Sequelizemeta,
	Subcategory,
	User,
	UserDate,
};
