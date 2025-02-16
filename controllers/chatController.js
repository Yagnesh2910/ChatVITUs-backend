const mongoose = require("mongoose");
const Chat = require("../models/chatHistorySchema");

const storeMessage = async (req, res) => {
    console.log("Received request body:", req.body);  // Log request data

    const { user_id, messages } = req.body;

    if (!user_id || !messages || !Array.isArray(messages) || messages.length === 0) {
        return res.status(400).json({ message: "Invalid data format" });
    }

    try {
        let chat = await Chat.findOne({ user_id });

        if (!chat) {
            chat = new Chat({ user_id, messages });
        } else {
            chat.messages.push(...messages);
        }

        await chat.save();
        res.status(200).json({ message: "Message saved successfully" });
    } catch (error) {
        console.error("Database error:", error);
        res.status(500).json({ message: error.message });
    }
};

const getChatHistory = async (req, res) => {
    try {
        const user_id = req.params.user_id;

        // Convert user_id to ObjectId
        if (!mongoose.Types.ObjectId.isValid(user_id)) {
            return res.status(400).json({ message: "Invalid user ID format" });
        }

        const chat = await Chat.findOne({ user_id: new mongoose.Types.ObjectId(user_id) });

        if (!chat) {
            return res.status(404).json({ message: "No chat history found" });
        }

        res.status(200).json(chat);
    } catch (err) {
        console.error("Database error:", err);
        res.status(500).json({ message: err.message });
    }
};

const clearChatHistory = async (req, res) => {
    try {
        const user_id = req.params.user_id;

        let clearedChat = await Chat.findOneAndUpdate(
            { user_id },
            { $set: { messages: [] } },
            { new: true }
        );

        if (!clearedChat) {
            clearedChat = await Chat.findOneAndUpdate(
                { user_id: new mongoose.Types.ObjectId(user_id) },
                { $set: { messages: [] } },
                { new: true }
            );
        }

        if (!clearedChat) {
            return res.status(404).json({ message: "Chat history not found" });
        }

        res.status(200).json(clearedChat);
    } catch (err) {
        console.error("Database error:", err);
        res.status(500).json({ message: err.message });
    }
};

module.exports = { storeMessage, getChatHistory, clearChatHistory };
