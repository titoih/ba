require('dotenv').config();

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const hbs = require('hbs');

require('./config/db.config');
require('./config/hbs.config');
const session = require('./config/session.config');

const authRouter = require('./routes/auth.routes');
const adsRouter = require('./routes/ads.routes');
const usersRouter = require('./routes/users.routes');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session);

app.use(function(req, res, next) {
  app.locals.session = req.session.currentUser;
  next();
});

app.use('/', authRouter)
app.use('/', adsRouter);
app.use('/usuario', usersRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

app.locals.title = 'BuenAnuncio.com'

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
