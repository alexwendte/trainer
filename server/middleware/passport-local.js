const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/User');
const init = require('./passport_init');

const _ = require('lodash');

passport.use(
  'local-login',
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true,
    },
    (req, email, password, done) => {
      User.findOne({ email: email }, (err, user) => {
        if (err) {
          return done(null, false, err);
          return err;
        }

        // email not found
        if (!user) {
          return done(null, false, 'email not found');
        }
        //Wrong password :(
        if (!user.validPassword(password)) {
          return done(null, false, 'wrong password');
        }
        console.log('All is good!');
        //all is well in authentication land
        return done(null, user);
      });
    }
  )
);

passport.use(
  'local-signup',
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true,
    },
    function(req, email, password, done) {
      var is_member = _.pick(req.body, ['is_member']);
      User.findOne({ email: email }, (err, user) => {
        // user with email exists
        if (user) {
          return done(null, false, 'A user with that email already exists');
        }

        // user with email doesn't exist so we make one
        let new_user = new User();
        new_user.email = email;
        new_user.password = new_user.generateHash(password);
        new_user.is_member = is_member;
        new_user.save(err => {
          if (err) {
            return done(null, false, err);
          }
          console.log('succes');
          return done(null, new_user);
        });
      });
    }
  )
);

init();
module.exports = passport;
