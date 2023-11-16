const asyncHandler = require('express-async-handler');
const {body, validationResult } = require('express-validator');
const User = require("../models/users");
const Message = require("../models/messages");

exports.get_create_message = asyncHandler(async (req, res, next) => {

    if (!req.session.passport) {
        res.render("new_message", {
            title: "Not logged",
            error: true,
        })
        return;
    }

    res.render("new_message", {title: "New Message"})
})

const decode = require('../config/he')

exports.post_create_message = [ 
    
    body("message").isEmpty().escape("Message should not be empty.")
    ,
    asyncHandler(async(req, res, next) => {
        const errors = validationResult(req.body);
        const user = await User.findById(req.user.id);
        const decodedMessage = decode(req.body.message)

        const message = new Message({
            message: decodedMessage,
            time_stamp: new Date(),
            user: user,
        })

        if (!errors.isEmpty()) {
            res.render("new_message", {
                title: "New Message",
                message: message,
                errors: errors.array()
            });
            return;
        };

        await message.save();
        res.redirect("/")
    })
]