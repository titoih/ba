const mongoose = require('mongoose');
const session    = require("express-session");
const MongoStore = require("connect-mongo")(session);

module.exports = session({
  secret: process.env.SESSION_SECRET || 'super secret BA',
  resave: true,
  saveUninitialized: false,
  rolling: true,
  cookie: { maxAge: 60000 },
  store: new MongoStore({
    mongooseConnection: mongoose.connection,
    ttl: 24 * 60 * 60 // 1 day
  })
});