const mongoose = require("mongoose");

const courtMsgSchema = new mongoose.Schema({
    name: String,
    email: String,
    club: String,
    subject: String,
    message: String,
    date: {
        type: Date,
        default: Date.now()
    }
})

module.exports = new mongoose.model('Contact_Messages', courtMsgSchema);