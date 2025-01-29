const express = require('express');
const router = express.Router();
const ElonController = require('../../controllers/admin-app/elon.controller');
const auth = require('../../middleware/auth.middleware');
const awaitHandlerFactory = require('../../middleware/awaitHandlerFactory.middleware');
const verifyRole = require('../../middleware/role/roleMiddleware');
const multer = require('multer');
const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, './upload/');
	},

	filename: (req, file, cb) => {
		file.originalname = file.originalname.replace(' ', '');
		cb(
			null,
			new Date().toISOString().replace(/:/g, '-') + '-' + file.originalname
		);
	},
});

var upload = multer({
	storage: storage,
	limits: {
		fileSize: 1024 * 1024 * 5,
	},
});
// const { validateLogin } = require('../../middleware/validators/admin-app/userValidator.middleware');

router.post(
	'/create',
	auth(),
	upload.array('img', 10),
	awaitHandlerFactory(ElonController.create)
);
router.patch(
	'/update/:id',
	auth(),
	upload.array('img', 10),
	awaitHandlerFactory(ElonController.update)
);
router.patch(
	'/confirm/:id',
	auth(),
	verifyRole('Admin'),
	awaitHandlerFactory(ElonController.tasdiqlash)
);
router.delete(
	'/delete/:id',
	auth(),
	verifyRole('Admin'),
	awaitHandlerFactory(ElonController.delete)
);
router.get(
	'/adminAll',
	auth(),
	verifyRole('Admin'),
	awaitHandlerFactory(ElonController.adminAll)
);
router.get('/userOne', auth(), awaitHandlerFactory(ElonController.userOne));
router.get(
	'/allElonAdmin',
	auth(),
	verifyRole('Admin'),
	awaitHandlerFactory(ElonController.adminElonAll)
);
router.get('/one/:id', auth(), awaitHandlerFactory(ElonController.getOne));
router.get('/names', awaitHandlerFactory(ElonController.getNameElon));
module.exports = router;
