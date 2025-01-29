const express = require('express');
const router = express.Router();
const categoryController = require('../../controllers/admin-app/category.controller');
const auth = require('../../middleware/auth.middleware');
const verifyRole = require('../../middleware/role/roleMiddleware');
const awaitHandlerFactory = require('../../middleware/awaitHandlerFactory.middleware');

// const { validateLogin } = require('../../middleware/validators/admin-app/userValidator.middleware');

router.post(
	'/create',
	auth(),
	verifyRole('Admin'),
	awaitHandlerFactory(categoryController.create)
);
router.patch(
	'/update/:id',
	auth(),
	verifyRole('Admin'),
	awaitHandlerFactory(categoryController.update)
);
router.delete(
	'/delete/:id',
	auth(),
	verifyRole('Admin'),
	awaitHandlerFactory(categoryController.delete)
);
router.get(
	'/all',
	auth(),
	verifyRole('Admin'),
	awaitHandlerFactory(categoryController.getAll)
);
// router.get(
// 	'/categoryAll',
// 	auth(),
// 	awaitHandlerFactory(categoryController.categoryAll)
// );
router.get('/mainCatAll', awaitHandlerFactory(categoryController.mainCatAll));
router.get(
	'/one/:id',
	auth(),
	verifyRole('Admin'),
	awaitHandlerFactory(categoryController.getOne)
);
router.get(
	'/categoryByName/:name',
	awaitHandlerFactory(categoryController.oneCategoryByName)
);

module.exports = router;
