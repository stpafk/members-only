var express = require('express');
var router = express.Router();

const userController = require('../controllers/userController');

router.get("/:id", userController.get_user_detail);

module.exports = router;