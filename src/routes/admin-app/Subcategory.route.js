const express = require('express');
const router = express.Router();
const SubcategoryController = require('../../controllers/admin-app/Subcategory.controller');
const auth = require('../../middleware/auth.middleware');
const verifyRole = require('../../middleware/role/roleMiddleware');
const awaitHandlerFactory = require('../../middleware/awaitHandlerFactory.middleware');

// const { validateLogin } = require('../../middleware/validators/admin-app/userValidator.middleware');

router.post(
	'/create',
	auth(),
	verifyRole('Admin'),
	awaitHandlerFactory(SubcategoryController.create)
);
router.patch(
	'/update/:id',
	auth(),
	verifyRole('Admin'),
	awaitHandlerFactory(SubcategoryController.update)
);
router.delete(
	'/delete/:id',
	auth(),
	verifyRole('Admin'),
	awaitHandlerFactory(SubcategoryController.delete)
);
router.get(
	'/all',
	auth(),
	verifyRole('Admin'),
	awaitHandlerFactory(SubcategoryController.getAll)
);
router.get(
	'/admin_mainCategory',
	auth(),
	awaitHandlerFactory(SubcategoryController.mainCategory)
);
router.get(
	'/one/:id',
	auth(),
	verifyRole('Admin'),
	awaitHandlerFactory(SubcategoryController.getOne)
);
router.get(
	'/field_one/:id',
	auth(),
	awaitHandlerFactory(SubcategoryController.sub_id_fields_doc)
);
router.get('/sub_elon', awaitHandlerFactory(SubcategoryController.elonAll));
router.get(
	'/suboneall_elon',
	awaitHandlerFactory(SubcategoryController.categoryElon)
);
// bu subcategory params name uchun
router.get(
	'/sub/:name',
	awaitHandlerFactory(SubcategoryController.SubCategoryNameList)
);
module.exports = router;
