var express = require('express');
var router = express.Router();
var User = require('../models/User');

/* GET home page. */
router.get('/', function(req, res, next) {
  User.find({ is_mentor: true }).then((mentors, err) => {
    if (err) {
      res.status(404).send({ message: 'Could not get any mentors' });
    }

    res.status(200).send({ mentors });
  });
});

module.exports = router;
