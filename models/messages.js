const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const MessagesSchema = new Schema({
    message: {type: String, required: true},
    time_stamp: {type: Date, required: true}, 
    user: {type: Schema.Types.ObjectId, ref: "User"},
})

module.exports = mongoose.model("Messages", MessagesSchema);