const express = require('express');
const router = express.Router();
const userController = require('../../controllers/admin-app/user.controller');
const auth = require('../../middleware/auth.middleware');
const Role = require('../../utils/roles.utils');
const awaitHandlerFactory = require('../../middleware/awaitHandlerFactory.middleware');

const { validateLogin } = require('../../middleware/validators/admin-app/userValidator.middleware');

router.post('/login', validateLogin, awaitHandlerFactory(userController.userLogin));
router.post('/create', auth(), awaitHandlerFactory(userController.create));
router.patch('/update/:id', auth(), awaitHandlerFactory(userController.update));
router.delete('/delete/:id', auth(), awaitHandlerFactory(userController.delete));
router.get('/all',auth(), awaitHandlerFactory(userController.getAll));
router.get('/one/:id', auth(), awaitHandlerFactory(userController.getOne));

module.exports = router;