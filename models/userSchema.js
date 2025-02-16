const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
    {
        name:{
            type: String,
            required: true,
        },

        email:{
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: function() {
                return !this.googleLogin; // Password required only if not using Google login
            },
        },
        googleLogin: {
            type: Boolean,
            default: false, // Track Google users
        },
    },
    {
        collection: "users",
    }
);

module.exports = mongoose.model("users", userSchema);