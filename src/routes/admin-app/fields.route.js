const express = require('express');
const router = express.Router();
const FieldsController = require('../../controllers/admin-app/fields.controller');
const auth = require('../../middleware/auth.middleware');
const verifyRole = require('../../middleware/role/roleMiddleware');
const awaitHandlerFactory = require('../../middleware/awaitHandlerFactory.middleware');

router.get(
	'/all',
	auth(),
	verifyRole('Admin'),
	awaitHandlerFactory(FieldsController.getAll)
);
router.get(
	'/one/:id',
	auth(),
	verifyRole('Admin'),
	awaitHandlerFactory(FieldsController.getOne)
);

module.exports = router;
