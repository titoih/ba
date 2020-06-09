require('dotenv').config();
const createError = require('http-errors');
const express = require('express');

const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

require('./config/db.config');
require('./config/hbs.config');

const session = require('./config/session.config');

const authRouter = require('./routes/auth.routes');
const adsRouter = require('./routes/ads.routes');
const legalRouter = require('./routes/legal.routes');
const usersRouter = require('./routes/users.routes');
const adminRouter = require('./routes/admin.routes');
const sitemapRouter = require('./routes/sitemap.routes');

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

app.use(function(req, res, next) {
  if(req.session.currentUser) {
    if(req.session.currentUser.email == process.env.FIRST_ADMIN_EMAIL && req.session.currentUser.role == 'admin') {
    res.locals.role = req.session.currentUser.role;
    }
  } 
  next();
});

app.use('/usuario', usersRouter);
app.use('/admin', adminRouter);
app.use('/', authRouter)
app.use('/', adsRouter);
app.use('/', legalRouter);
app.use('/', sitemapRouter);


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
  
  console.log(err)
  
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

const cron = require('./cron/cronjob');
// cron.expireAds();
// cron.deleteLockedEmail();

//// Log to file
var fs = require('fs'); var util = require('util');
var log_file = fs.createWriteStream(__dirname + '/node.log', {flags : 'w'});
var log_stdout = process.stdout;

console.log = function(d) { //
 log_file.write(util.format(d) + '\n');
 log_stdout.write(util.format(d) + '\n');
};
////

module.exports = app;
app.listen()
