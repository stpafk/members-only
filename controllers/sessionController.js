const asyncHandler = require('express-async-handler');
const {body, validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');
const User = require('../models/users');
const Message = require('../models/messages')
const passport = require('passport');
const authLogin = require('../config/passport')

exports.get_index = asyncHandler(async(req, res, next) => {

    const messages = await Message.find({})
    .populate("user")
    .sort({time_stamp: -1})
    .exec();

    res.render("index", { 
        title: "People been saying...",
        messages: messages,
    })
});

exports.get_register = asyncHandler(async(req, res, next) => {
    res.render("register", { title: "Register" })
});

const decode = require('../config/he');

exports.post_register = [

    body("first_name").trim().isLength({min: 2, max: 50}).escape("Invalid first name."),
    body("last_name").trim().isLength({min: 2, max: 50}).escape("Invalid last name."),
    body("email").custom(async value => {

        const userEmail = await User.find({email: value});
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i;

        if(userEmail.length > 0) {
            throw new Error("Email already registered.");
        };

        if(!emailRegex.test(value)) {
            throw new Error("Invalid email.");
        }

    }),
    body("password").isLength({min: 6}).escape("Password length should be bigger than 6."),
    body("ps_confirm").custom((value, {req}) => {
        return value === req.body.password;
    }).escape("Passwords do not match"),

    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);
        const password = await bcrypt.hash(req.body.password, 12);
        const first_name = decode(req.body.first_name);
        const last_name = decode(req.body.last_name);

        const user = new User({
            first_name: first_name,
            last_name: last_name,
            email: req.body.email,
            password: password,
        })

        if(!errors.isEmpty()) {
            res.render("register", {
                title: "Register",
                user: user,
                errors: errors.array(),
            });
            return;
        };

        await user.save();
        res.redirect("/login");
    })
];

exports.get_login = asyncHandler(async (req, res, next) => {
    res.render("login", {title: "Login"});
})

exports.post_login = [
    passport.authenticate("login"), 
    asyncHandler(async(req, res, next) => {
        res.redirect("/");
    })
];

exports.get_logout = asyncHandler(async(req, res, next) => {

    if(res.locals.session === null) {
        res.redirect("/login");
    }

    res.render("logout", {title: "Logout"})
})

exports.post_logout = asyncHandler(async(req, res, next) => {
    req.logout(function(err) {
        if(err) {
            return next(err);
        }

        res.redirect("/");
    })
});

exports.handle_get_contribute = asyncHandler(async(req, res, next) => {

    let notLogged;
    req.user ? notLogged = false : notLogged = true; 

    if (notLogged) {
        res.render("not_logged", {
            problem: "contribute"
        });
    };

    res.render("contribute", {
        title: "Contribute",
    })

})

const handle_admin = require('../config/handle_admin');

exports.handle_post_contribute = [
    body("amount").isInt({min: 0, max: 100}).escape("Input valid amount."),

    asyncHandler(async(req, res, next) => {
        const errors = validationResult(req.body);

        if (!errors.isEmpty()) {
            res.render("contribute", {
                title: "Contribute",
                notLogged: false,
                errors: errors.array()
            })
            return;
        }

        const user = await User.findById(req.user.id);
        const amount = Number.parseInt(req.body.amount)

        if (user.amount_contributed > 0) {
            await User.findByIdAndUpdate(user._id, {
                amount_contributed: user.amount_contributed + amount,
            }, {});
        } else {
            await User.findByIdAndUpdate(req.user.id, {amount_contributed: amount}, {});
        }

        handle_admin.handle_admin();
        
        res.redirect("/contribute/top")
    })
]

exports.get_top = asyncHandler(async(req, res, next) => {

    const contributors = await User.find().sort({ amount_contributed: -1 }).limit(10).exec();
    let notLogged;
    req.user ? notLogged = false : notLogged = true; 

    if (notLogged) {
        res.render("not_logged", {
            problem: "contribute"
        });
    };

    res.render("top_contribute", {
        title: "Top Contributors",
        contributors: contributors,
    });

})