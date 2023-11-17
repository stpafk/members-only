var express = require('express');
var router = express.Router();
const User = require('../models/users')
const messageController = require("../controllers/messagesController");

router.get('*', function(req, res, next) {
  res.locals.session = req.session.passport || null;
  next();
})

router.get('/new', messageController.get_create_message);
router.post('/new', messageController.post_create_message);

router.get("/:id", messageController.get_message);
router.post("/:id/delete", messageController.post_message_delete)

module.exports = router;
