const express = require('express');
const ChatController = require('../controllers/chatController');

const router = express.Router();

router.post("/storeMessage", ChatController.storeMessage);
router.get("/getChatHistory/:user_id", ChatController.getChatHistory);
router.post("/clearChatHistory/:user_id", ChatController.clearChatHistory);

module.exports = router;