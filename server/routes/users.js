const express = require('express');
const router = express.Router();
const { isAuthenticated, validateObjectID } = require('../middleware/middleware_mixins');
const User = require('../models/User');

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

router.get('/current_user', (req, res, next) => {
  if (!req.user) {
    res.status(401).json({});
  }
  const { _id, name, email } = req.user;
  res.status(200).json({ _id, email, name });
});

router.get('/logout', (req, res, next) => {
  req.logout();
  res.status(200).json({ message: 'Logout successful' });
});

router.get('/profile/:id', isAuthenticated, validateObjectID, (req, res, next) => {
  var id = req.params.id;

  /* if (String(req.user._id) !== id)
    return res.status(403).json({ message: 'You do not have permission to view this page' }); */

  User.findById(id, '-password').then((user, err) => {
    if (err) return res.status(400).json({ message: 'User could not be fetched' });

    res.status(200).json(user);
  });
});

router.patch('/update/:id', isAuthenticated, validateObjectID, (req, res, next) => {
  const { id } = req.params;
  const { career, bio, rate, name, email, category, phoneNumber, avatar } = req.body;

  if (String(req.user._id) !== id)
    return res.status(403).json({ message: 'You do not have permission to edit this page' });
  User.findByIdAndUpdate(id, { career, bio, rate, name, email, category, phoneNumber, avatar }, { new: true }).then(
    (user, err) => {
      if (err) res.status(400).json({ message: 'Your profile could not be updated' });
      res.status(200).json({ user, message: 'Your account has been updated' });
    }
  );
});

router.delete('/delete/:id', isAuthenticated, (req, res, next) => {
  var id = req.params.id;
  if (!ObjectID.isValid(id)) return res.status(400).json({ message: 'Invalid ID for a User' });
  if (String(req.user._id) !== id)
    return res.status(403).json({ message: 'You do not have permission to edit this page' });
  User.findByIdAndDelete(id).then((user, err) => {
    if (err) res.status(400).json({ message: 'The user could not be deleted' });
    res.status(200).json({ user, message: 'Your account has been deleted' });
  });
});

module.exports = router;
