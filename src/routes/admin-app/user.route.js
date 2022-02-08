const express = require('express');
const router = express.Router();
const userController = require('../../controllers/admin-app/user.controller');
const auth = require('../../middleware/auth.middleware');
const Role = require('../../utils/roles.utils');
const awaitHandlerFactory = require('../../middleware/awaitHandlerFactory.middleware');

const { validateLogin } = require('../../middleware/validators/admin-app/userValidator.middleware');

router.post('/login', validateLogin, awaitHandlerFactory(userController.userLogin));

module.exports = router;