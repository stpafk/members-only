const asyncHandler = require('express-async-handler');
const User = require('../models/users');
const Message = require('../models/messages');

exports.get_user_detail = asyncHandler(async (req, res, next) => {

    const [user, messagesByUser] = await Promise.all([
        User.findById(req.params.id).exec(),
        Message.find({user: req.params.id}).exec()
    ]);

    if (!req.user) {
        res.render("not_logged", {
            problem: "see users"
        })
    }

    if (user === null) {
        const err = new Error("User does not exist.");
        err.status = 404;
        return next(err);
    }

    res.render("user_detail", {
        title: user.full_name + " Messages",
        userMessages: messagesByUser,
    })

})