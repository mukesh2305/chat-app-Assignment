const express = require("express");
const { getAllChatMessages, updateChatMessage, deleteChatMessage } = require("../controller/chatMessage.controller.js");
const router = express.Router();

router.route("/getAllMessages").get(getAllChatMessages);
router.route("/updateChat/:id").put(updateChatMessage);
router.route("/deleteChat/:id").delete(deleteChatMessage);


module.exports = router;