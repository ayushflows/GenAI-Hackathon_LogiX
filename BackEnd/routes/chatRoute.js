const express = require("express");
const router = express.Router();
const chatController = require("../controllers/chatController")

router
    .route("/")
    .post(chatController.chat);

module.exports = router;