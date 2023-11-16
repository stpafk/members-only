var express = require('express');
var router = express.Router();
const sessionController = require('../controllers/sessionController');

/* GET home page. */
router.get('*', function(req, res, next) {
  res.locals.session = req.session.passport || null;
  console.log(res.locals.session)
  next();
})
router.get('/', sessionController.get_index);

router.get("/register", sessionController.get_register);
router.post("/register", sessionController.post_register);

router.get("/login", sessionController.get_login);
router.post("/login", sessionController.post_login);

router.get("/logout", sessionController.get_logout)
router.post("/logout", sessionController.post_logout);

module.exports = router;
