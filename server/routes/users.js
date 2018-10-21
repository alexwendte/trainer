const express = require('express');
const router = express.Router();
const isAuthenticated = require('../middleware/is_logged_in');
const User = require('../models/User');

const _ = require('lodash');
var { ObjectID } = require('mongodb');
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
  const { name, email } = req.user;
  res.status(200).json({ email, name });
});

router.get('/logout', (req, res, next) => {
  req.logout();
  res.status(200).json({ message: 'Logout successful' });
});

router.get('/profile/:id', isAuthenticated, (req, res, next) => {
  var id = req.params.id;

  if(!ObjectID.isValid(id)) return res.status(400).json({ message: "Invalid ID for a User" })
  if (String(req.user._id) !== id) return res.status(403).json({ message: "You do not have permission to view this page"});

  User.findById(id).then((user, err) => {
    if(err) return res.status(400).json({ message: "User could not be fetched"});

    res.status(200).send(user)
  })
});

router.patch('/update/:id', isAuthenticated, (req, res, next) => {
  var id = req.params.id;
  var {
    career, 
    bio, 
    rate, 
    name, 
    email, 
    password } = _.pick(req.body, ['career', 'bio', 'rate', 'email', 'name', 'password'])

  if(!ObjectID.isValid(id)) return res.status(400).json({ message: "Invalid ID for a User" })

  if (String(req.user._id) !== id) return res.status(403).json({ message: "You do not have permission to edit this page"})
  User.findByIdAndUpdate(id, {career, bio, rate, name, email, password}, { new: true })
  .then((user, err) => {
    if(err) res.status(400).json({ message: "Your profile could not be updated"});
    res.status(200).json({ user, message: "Your account has been updated" });
  });
})

router.delete('/delete/:id', isAuthenticated, (req, res, next) => {
  var id = req.params.id;

  if(!ObjectID.isValid(id)) return res.status(400).json({ message: "Invalid ID for a User" })
  
  if (String(req.user._id) !== id) return res.status(403).json({ message: "You do not have permission to edit this page"})
  User.findByIdAndDelete(id).then((user, err) => {
    if(err) res.status(400).json({ message: "The user could not be deleted"});
    res.status(200).json({ user, message: "Your account has been deleted" });
  });
})

module.exports = router;
