const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require('../models/user');
const bcrypt = require('bcryptjs')

passport.use('login', new LocalStrategy(
    {usernameField: "username", passwordField: "password"},
    function(username, password, done) {
        console.log('auth');    
        User.findOne({email: username})
        .then((user) => {
            console.log(user);
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
    done(null, user.id);
})

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    }
    catch(err) {
        done(err);
    };
});