const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const MongoDbStore = require('connect-mongodb-session')(session);
const passport = require('passport');
require('dotenv').config();
require('./middleware/passport_init')(passport);

/******  ROUTES ******/
const mentors = require('./routes/mentors');
const users = require('./routes/users');
const meetings = require('./routes/meetings');
const payments = require('./routes/payments');

/******  DATABASE AND CONFIG ******/
require('./database/mongoose');

/******** Session Storage *******/
const store = new MongoDbStore({
  uri: process.env.MONGO_SESSION_STORE,
  databaseName: 'trainer_sessions',
  collection: 'Sessions',
});

store.on('connected', function() {
  store.client;
});

store.on('error', function(error) {
  assert.ifError(error);
  assert.ok(false);
});

const app = express();
app.use(helmet());

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../client/build')));
// Setup the express-session starge with a very secure secret key
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 30, // 1 month
    },
    store: store,
    resave: true,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use('/api/mentors', mentors);
app.use('/api/meetings', meetings);
app.use('/api/users', users);
app.use('/api/payments', payments);

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'), err => {
    if (err) {
      res.status(500).send(err);
    }
  });
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  console.error(err);
  res.send('error');
});

module.exports = app;
