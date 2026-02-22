//Making this to do authentication
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    googleId: {
        type: String,
        unique: true,
        sparse: true
    },
    role: {
        type: String,
        required: true,
        default: "NORMAL",
    },
    password: {
        type: String,
        required: false, // Made optional for Google OAuth users
    },
},
    { timestamps: true }
);

const user = mongoose.model("user", userSchema);

module.exports = user;

