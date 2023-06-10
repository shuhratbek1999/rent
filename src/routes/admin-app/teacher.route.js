const express = require('express');
const router = express.Router();
const TeacherController = require('../../controllers/admin-app/teacher.controller');
const auth = require('../../middleware/auth.middleware');
const Role = require('../../utils/roles.utils');
const awaitHandlerFactory = require('../../middleware/awaitHandlerFactory.middleware');

// const { validateLogin } = require('../../middleware/validators/admin-app/userValidator.middleware');

router.post('/create', auth(), awaitHandlerFactory(TeacherController.create));
router.patch('/update/:id', auth(), awaitHandlerFactory(TeacherController.update));
router.delete('/delete/:id', auth(), awaitHandlerFactory(TeacherController.delete));
router.get('/all',auth(), awaitHandlerFactory(TeacherController.getAll));
router.get('/one/:id', auth(), awaitHandlerFactory(TeacherController.getOne));

module.exports = router;