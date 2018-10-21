const express = require('express');
const router = express.Router();
var { ObjectID } = require('mongodb');
const isAuthenticated = require('../middleware/is_logged_in');
const _ = require('lodash');
const Meeting = require('../models/Meeting');
const Assignment = require('../models/Assignment');

// GET ALL MEETINGS
router.get('/list', isAuthenticated, (req, res, next) => {
  var query = { $or: [{ studentID: req.user._id }, { mentorID: req.user._id }] };

  Meeting.find(query)
    .populate('mentorID', 'name email career rate bio')
    .populate('studentID', 'name email career bio')
    .then((meetings, err) => {
      if (err) {
        return res.status(400).json({ message: 'An error has occured' });
      }

      res.status(200).json(meetings);
    });
});

// CREATE A MEETING
router.post('/create', isAuthenticated, (req, res, nex) => {
  const studentID = req.user._id;
  const { mentorID, meetingDate, agenda, initialMessage, title } = req.body;
  var meeting = new Meeting({
    studentID,
    mentorID,
    meetingDate,
    initialMessage,
    agenda,
    title,
  });
  meeting.save().then((meeting, err) => {
    if (err) return res.status(400).json({ message: 'An error has occured' });
    res.status(201).json({
      meeting,
      message: 'Your meeting has been requested',
    });
  });
});

// GET A MEETING BY ID
router.get('/meeting/:id', isAuthenticated, (req, res, next) => {
  var id = req.params.id;

  if (!ObjectID.isValid(id)) return res.status(400).json({ message: 'That is not a valid meeting ID' });

  Meeting.findById(id)
    .populate('mentorID', 'name email career rate bio')
    .populate('studentID', 'name email career bio')
    .then((meeting, err) => {
      if (err) return res.status(400).json({ message: 'An error has occured' });
      res.status(200).json(meeting);
    });
});

// UPDATE A MEETING
router.patch('/meeting/:id', isAuthenticated, (req, res, next) => {
  var id = req.params.id;
  var { title, agenda, meetingDate } = _.pick(req.body, ['title', 'agenda', 'meetingDate']);
  if (!ObjectID.isValid(id)) return res.status(400).json({ message: 'That is an invalid meeting ID' });

  Meeting.findByIdAndUpdate(id, { title, agenda, meetingDate })
    .populate('mentorID', 'name email career rate bio')
    .populate('studentID', 'name email career bio')
    .then((meeting, err) => {
      if (err) return res.status(400).json({ message: 'An unexpected error has occured' });
      res.status(200).json({ meeting, message: 'Meeting updated successfully' });
    });
});

// DELETE A MEETING
router.delete('/meeting/:id', isAuthenticated, (req, res, next) => {
  var id = req.params.id;

  if (!ObjectID.isValid(id)) return res.status(400).json({ message: 'That is not a valid meeting ID' });

  Meeting.findByIdAndDelete(id).then((meeting, err) => {
    if (err) return res.status(400).json({ message: 'An error has occured' });
    res.status(200).json({ meeting, message: 'Meeting deleted successfully' });
  });
});

/******* Asignments API *******/

// GET ALL ASSIGNMENTS
router.get('/assignments/', isAuthenticated, (req, res, next) => {
  next();
});

// CREATE AN ASSIGNMENT
router.post('/assignments/', isAuthenticated, (req, res, next) => {
  next();
});

// GET ASSIGNMENT BY ID
router.get('/assignments/:id', isAuthenticated, (req, res, next) => {
  next();
});
// UPDATE AN ASSIGNMENT
router.patch('/assignments/:id', isAuthenticated, (req, res, next) => {
  next();
});
// DELETE AN ASSIGNMENT
router.delete('/assignments/:id', isAuthenticated, (req, res, next) => {
  next();
});

module.exports = router;
