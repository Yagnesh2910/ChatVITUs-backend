const mongoose = require('mongoose');

const messageSchema = mongoose.Schema({
    sender: {
        type: String,
        enum: ['user', 'bot'],
        required: true,
    },
    text: {
        type: String,
        required: true,
    },
    timestamp: {
        type: Date,
        default: Date.now,
    },
});

const chatSchema = new mongoose.Schema(
    {
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User", // Reference to User model
            required: true,
        },
        messages: [messageSchema], // Store multiple messages in an array
        timestamp: {
            type: Date,
            default: Date.now,
        },
    },
    { collection: "chats" } // Explicitly define collection name
);

module.exports = mongoose.model("chats", chatSchema);
