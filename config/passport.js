const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require('../models/users');
const bcrypt = require('bcryptjs')

passport.use('login', new LocalStrategy(
    {usernameField: "email", passwordField: "password"},
    function(username, password, done) {
        User.findOne({email: username})
        .then((user) => {
            if (!user) {
                return done(null, false, {message: "problem"})
            } 

            const match = bcrypt.compareSync(password, user.password);
            if(!match) {
                return done(null, false, {message: "problem passwd"});
            }

            return done(null, user);
        });
    }
));

passport.serializeUser((user, done) => {
    process.nextTick(function() {
        done(null, {id: user.id, first: user.first_name, user: user.full_name, is_admin: user.is_admin})
    })
})

passport.deserializeUser(async (user, done) => {
    process.nextTick(function() {
        return done(null, user);
    })
});