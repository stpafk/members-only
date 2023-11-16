var express = require('express');
var router = express.Router();
const User = require('../models/users')
const messageController = require("../controllers/messagesController");

router.get('*', function(req, res, next) {
  res.locals.session = req.session.passport || null;
  next();
})

router.get('/new', messageController.get_create_message)
module.exports = router;
