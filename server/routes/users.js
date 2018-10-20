const express = require('express');
const router = express.Router();
const passport = require('passport');
const passportLocal = require('../middleware/passport-local');

// SIGNUP USER
router.post(
  '/signup',
  passportLocal.authenticate('local-signup', {
    successMessage: 'Yay!',
    failureMessage: "Didn't work bro",
  })
);

router.post(
  '/login',
  passport.authenticate('local-login', {
    successMessage: 'Yay!',
    failureMessage: "Didn't work bro",
  })
);
module.exports = router;
