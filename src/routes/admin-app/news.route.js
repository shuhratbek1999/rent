const express = require('express');
const router = express.Router();
const NewsController = require('../../controllers/admin-app/news.controller');
const auth = require('../../middleware/auth.middleware');
const Role = require('../../utils/roles.utils');
const awaitHandlerFactory = require('../../middleware/awaitHandlerFactory.middleware');
const multer = require('multer');
const path = require('path')
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
           cb(null, './upload/');
      },
     
      filename: (req, file, cb) =>{
        console.log(file);
        req.body.file = `_${Date.now()}${path.extname(file.originalname)}`;
         cb(null, req.body.file);
        }
});

var upload = multer({
    storage: storage,
    limits:{
        fileSize: 1024 * 1024 * 5
    }
}).single('image')
// const { validateLogin } = require('../../middleware/validators/admin-app/userValidator.middleware');

router.post('/create', auth(), upload, awaitHandlerFactory(NewsController.create));
router.patch('/update/:id', auth(), upload, awaitHandlerFactory(NewsController.update));
router.delete('/delete/:id', auth(), awaitHandlerFactory(NewsController.delete));
router.get('/all',auth(), awaitHandlerFactory(NewsController.getAll));
router.get('/one/:id', auth(), awaitHandlerFactory(NewsController.getOne));

module.exports = router;