var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
require("dotenv").config();

var indexRouter = require('./routes/index');
var messageRouter = require('./routes/message');
var userRouter = require('./routes/user');

var app = express();

/*
CONNECT TO MONGODB
*/

const mongoDB = process.env.MONGODB

main().catch(err => console.log(err));
mongoose.set("strictQuery", false);
async function main() {
  await mongoose.connect(mongoDB);
}

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/*
  ADD SESSIONS
*/
app.use(session({
  secret: "kitty",
  resave: false,
  saveUninitialized: true,
}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/', indexRouter);
app.use('/message', messageRouter);
app.use('/user', userRouter);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
