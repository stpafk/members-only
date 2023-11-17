const mongoose = require('mongoose');
const DateTime = require('luxon').DateTime
const Schema = mongoose.Schema;

const MessagesSchema = new Schema({
    message: {type: String, required: true},
    time_stamp: {type: Date, required: true}, 
    user: {type: Schema.Types.ObjectId, ref: "User"},
})

MessagesSchema.virtual("url").get(function() {
    return `/message/${this._id}`;
})

MessagesSchema.virtual("formatted_date").get(function() {
    return this.time_stamp ? DateTime.fromJSDate(this.time_stamp).toLocaleString(DateTime.DATETIME_FULL_WITH_SECONDS) : "";
})

module.exports = mongoose.model("Messages", MessagesSchema);