const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    first_name: {type: String, minLength: 2, required: true},
    last_name: {type: String, minLength: 2, required: true},
    email: {type: String, minLength: 6, required: true},
    password: {type: String, minLength: 6, required: true,},
    amount_contributed: {type: Number, default: 0},
    is_admin: {type: Boolean},
})

UserSchema.virtual("full_name").get(function() {
    return `${this.first_name} ${this.last_name}`;
});

UserSchema.virtual("url").get(function() {
    return `/user/${this._id}`;
})

module.exports = mongoose.model("User", UserSchema);