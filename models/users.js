const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    first_name: {type: String, minLength: 2, required: true},
    last_name: {type: String, minLength: 2, required: true},
    email: {type: String, minLength: 6, required: true},
    password: {type: String, minLength: 6, required: true,},

    is_admin: {type: Boolean},
})

UserSchema.virtual("full_name").get(function() {
    return `${first_name} ${last_name}`;
});

module.exports = mongoose.model("User", UserSchema);