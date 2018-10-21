var express = require('express');
var router = express.Router();
const { validateObjectID } = require('../middleware/middleware_mixins');
var User = require('../models/User');

/* GET home page. */
router.get('/', function(req, res, next) {
  User.find({ isMentor: true }).then((mentors, err) => {
    if (err) {
      res.status(404).json({ message: 'Could not get any mentors' });
    }

    res.status(200).json(mentors);
  });
});
/* get a specific mentor */

router.get('/:id', validateObjectID, (req, res, next) => {
  var id = req.params.id;

  User.findById(id, '-password').then((mentor, err) => {
    if (err) return res.status(400).json({ message: 'User could not be fetched' });

    res.status(200).json(mentor);
  });
});

module.exports = router;
