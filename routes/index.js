var express = require('express');
var router = express.Router();
const sessionController = require('../controllers/sessionController');
const passport = require('passport');
const authLogin = require('../config/passport')

/* GET home page. */
router.get('/', sessionController.get_index);

router.get("/register", sessionController.get_register);
router.post("/register", sessionController.post_register);

router.get("/login", sessionController.get_login);
router.post("/login", passport.authenticate("login"), function(req, res) {
  res.redirect("/")
})

module.exports = router;
