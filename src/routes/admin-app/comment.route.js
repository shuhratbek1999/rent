const express = require('express');
const router = express.Router();
const commentController = require('../../controllers/admin-app/comment.controller');
const auth = require('../../middleware/auth.middleware');
const Role = require('../../utils/roles.utils');
const awaitHandlerFactory = require('../../middleware/awaitHandlerFactory.middleware');

const {
	validateLogin,
} = require('../../middleware/validators/admin-app/userValidator.middleware');

router.post('/create', auth(), awaitHandlerFactory(commentController.create));
router.patch(
	'/update/:id',
	auth(),
	awaitHandlerFactory(commentController.update)
);
router.delete(
	'/delete/:id',
	auth(),
	awaitHandlerFactory(commentController.delete)
);
router.get('/all', auth(), awaitHandlerFactory(commentController.getAll));
router.get('/one/:id', auth(), awaitHandlerFactory(commentController.getOne));

module.exports = router;
