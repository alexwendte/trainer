const express = require('express');
const router = express.Router();
const passport = require('passport');
const passportLocal = require('../middleware/passport-local');

// SIGNUP USER
router.post(
  '/signup',
  passportLocal.authenticate('local-signup', {
    successRedirect: '/',
    failureMessage: "Didn't work bro",
  })
);

router.post(
  '/login',
  passport.authenticate('local-login', {
    successRedirect: '/',
    failureMessage: "Didn't work bro",
  })
);
module.exports = router;
