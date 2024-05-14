const express = require("express");
const router = express.Router();
const {getChatHistory} = require("../controllers/chat_controller")

router.get("/history/:jalsahId", getChatHistory)

module.exports = router;