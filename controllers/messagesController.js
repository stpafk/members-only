const asyncHandler = require('express-async-handler');
const {body, validationResult} = require('express-validator');
const User = require("../models/users");
const Message = require("../models/messages");

exports.get_create_message = asyncHandler(async (req, res, next) => {

    if (!req.session) {
        res.render("new_message", {
            title: "Not logged",
            error: true,
        })
        return;
    }

    res.render("new_message", {title: "New Message"})
})