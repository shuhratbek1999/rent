const express = require('express');
const router = express.Router();
const CommentController = require('../../controllers/admin-app/comment.controller');
const auth = require('../../middleware/auth.middleware');
const Role = require('../../utils/roles.utils');
const awaitHandlerFactory = require('../../middleware/awaitHandlerFactory.middleware');

// const { validateLogin } = require('../../middleware/validators/admin-app/userValidator.middleware');

router.post('/create', auth(), awaitHandlerFactory(CommentController.create));
router.patch('/update/:id', auth(), awaitHandlerFactory(CommentController.update));
router.delete('/delete/:id', auth(), awaitHandlerFactory(CommentController.delete));
router.get('/all',auth(), awaitHandlerFactory(CommentController.getAll));
router.get('/one/:id', auth(), awaitHandlerFactory(CommentController.getOne));

module.exports = router;