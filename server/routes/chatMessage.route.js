const express = require("express");
const { getAllChatMessages } = require("../controller/chatMessage.controller.js");
const router = express.Router();

router.route("/getAllMessages").get(getAllChatMessages);


module.exports = router;