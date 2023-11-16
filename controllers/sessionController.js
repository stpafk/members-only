const asyncHandler = require('express-async-handler');
const {body, validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');
const User = require('../models/users');
const passport = require('passport');
const authLogin = require('../config/passport')

exports.get_index = asyncHandler(async(req, res, next) => {
    res.render("index", { title: "Members Only"})
});

exports.get_register = asyncHandler(async(req, res, next) => {
    res.render("register", { title: "Register" })
});

exports.post_register = [

    body("first_name").trim().isLength({min: 2, max: 50}).escape("Invalid first name."),
    body("last_name").trim().isLength({min: 2, max: 50}).escape("Invalid last name."),
    body("email").custom(async value => {

        const userEmail = await User.find({email: value});
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i;

        if(userEmail.length > 0) {
            console.log(userEmail)
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

        const user = new User({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
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
    console.log(req.session)
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
})
