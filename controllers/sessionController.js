const asyncHandler = require('express-async-handler');
const {body, validationResult} = require('express-validator');
const User = require('../models/users')

exports.get_index = asyncHandler(async(req, res, next) => {
    res.render("index", {
        title: "Members Only",
        req: req,
    })
});

exports.get_register = asyncHandler(async(req, res, next) => {
    res.render("index", {
        title: "Register",
        req: req,
    })
});

exports.post_register = [
    
    body("first_name").trim().isLength({min: 2, max: 50}).escape("Invalid first name."),
    body("last_name").trim().isLength({min: 2, max: 50}).escape("Invalid last name."),
    body("email").custom(async value => {

        const user = await User.find({email: value});
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i;

        if(user) {
            throw new Error("Email already registered.");
        };
        
        if(!emailRegex.test()) {
            throw new Error("Invalid email.");
        }

    }),
    body("password").isLength({min: 6}).escape("Password length should be bigger than 6."),
    body("ps_confirm").custom((value, {req}) => {
        return value === req.body.password;
    }),

    asyncHandler(async (req, res, next) => {

    })
]



