const express = require('express');
const router = express.Router();
const passport = require('passport');
const passportLocal = require('../middleware/passport-local');

// SIGNUP USER
router.post(
  '/signup',
  passportLocal.authenticate('local-signup', {
    successMessage: 'Yay!',
    failureMessage: "Did'nt work bro",
  })
);

router.post(
  '/login',
  passport.authenticate('local-login', {
    successRedirect: '/',
    failureRedirect: '/error',
  })
);
module.exports = router;
