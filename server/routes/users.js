const express = require('express');
const router = express.Router();
const passport = require('passport');
const passportLocal = require('../middleware/passport-local');

// SIGNUP USER
router.post('/api/signup', passport.authenticate('local-signup', {
  successRedirect: '/profile',
  failureRedirect: '/error',
}));

router.post('/api/login', passport.authenticate('local-login', {
  successRedirect: '/',
  failureRedirect: '/error'
}))
module.exports = router;
