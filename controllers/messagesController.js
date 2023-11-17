const asyncHandler = require('express-async-handler');
const {body, validationResult } = require('express-validator');
const User = require("../models/users");
const Message = require("../models/messages");

exports.get_create_message = asyncHandler(async (req, res, next) => {

    res.render("not_logged", {
        problem: "post a message"
    });

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

exports.get_message = asyncHandler(async (req, res, next) => {
    let canDelete = false;
    const message = await Message.findById(req.params.id)
    .populate("user")
    .exec();

    if (message === null) {
        const err = new Error("Message does not exist");
        err.status = 404;
        return next(err);
    };

    if (!req.user) {
        res.render("not_logged", {
            problem: "see details from messages"
        });
        return;
    }

    if (req.user.is_admin || req.user.id === message.user.id) {
        canDelete = true;
    }

    res.render("message_detail", {
        title: "Message Detail", 
        message: message,
        canDelete: canDelete,
    })

})

exports.post_message_delete = asyncHandler(async (req, res, next) => {

    const message = await Message.findById(req.params.id)
    .populate("user")
    .exec();

    if (!req.user.is_admin) {

        if (message.user.equals(req.user.id)) {
            await Message.findByIdAndDelete(req.params.id);
            res.redirect("/")
        }

        const err = new Error("Not allowed");
        err.status = 405;
        return next(err);
    }
    
    await Message.findByIdAndDelete(req.params.id);
    res.redirect("/")
    
})