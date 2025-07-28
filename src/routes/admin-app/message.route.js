const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth.middleware");
const awaitHandlerFactory = require("../../middleware/awaitHandlerFactory.middleware");
const xabarController = require("../../controllers/admin-app/message.controller");
// Chat tarixini olish
router.get(
  "/one/:myId/:otherUserId",
  auth(),
  awaitHandlerFactory(xabarController.getOne)
);
router.get(
  "/user/:myId",
  auth(),
  awaitHandlerFactory(xabarController.getChattedUsers)
);
router.get(
  "/incoming/:myId",
  auth(),
  awaitHandlerFactory(xabarController.getIncomingUsers)
);

module.exports = router;
