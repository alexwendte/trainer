const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const transactionsEvents = require('../middleware/events');
const { isAuthenticated, validateObjectID } = require('../middleware/middleware_mixins');
const Meeting = require('../models/Meeting');

// GET ALL MEETINGS
router.get('/list', isAuthenticated, (req, res, next) => {
  let query = { $or: [{ studentID: req.user._id }, { mentorID: req.user._id }] };

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

router.get('/mentorlist', isAuthenticated, (req, res, next) => {
  let query = { mentorID: req.user._id };

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
router.post('/create', isAuthenticated, (req, res, next) => {
  let studentID = req.user._id;
  console.log(req.body);
  let { mentorID, meetingDate, agenda, initialMessage, title } = req.body.meeting;
  let meeting = new Meeting({
    studentID,
    mentorID,
    meetingDate,
    initialMessage,
    agenda,
    title,
  });
  meeting.save().then((meeting, err) => {
    meeting.populate('mentorID', '-password').populate('studentID', '-password');
    if (err) return res.status(400).json({ message: 'An error has occured' });
    transactionsEvents.emit('meetingRequested', meeting, req.body);
    res.status(201).json({
      meeting,
      message: 'Your meeting has been requested',
    });
  });
});

// GET A MEETING BY ID
router.get('/meeting/:id', isAuthenticated, validateObjectID, (req, res, next) => {
  let id = req.params.id;

  Meeting.findById(id)
    .populate('mentorID', 'name email career rate bio')
    .populate('studentID', 'name email career bio')
    .then((meeting, err) => {
      if (err) return res.status(400).json({ message: 'An error has occured' });
      res.status(200).json(meeting);
    });
});

// UPDATE A MEETING
router.patch('/meeting/:id', validateObjectID, (req, res, next) => {
  let id = req.params.id;
  let { title, agenda, meetingDate, isAccepted } = req.body;

  Meeting.findByIdAndUpdate(id, { title, agenda, meetingDate, isAccepted }, { new: true })
    .populate('mentorID', 'name email career rate bio')
    .populate('studentID', 'name email career bio')
    .then((meeting, err) => {
      if (err) return res.status(400).json({ message: 'An unexpected error has occured' });
      if (isAccepted) {
        transactionsEvents.emit('meetingAccepted', meeting, req.body);
      }
      res.status(200).json({ meeting, message: 'Meeting updated successfully' });
    });
});

// DELETE A MEETING
router.delete('/meeting/:id', isAuthenticated, validateObjectID, (req, res, next) => {
  let id = req.params.id;

  Meeting.findByIdAndDelete(id).then((meeting, err) => {
    if (err) return res.status(400).json({ message: 'An error has occured' });
    res.status(200).json({ meeting, message: 'Meeting deleted successfully' });
  });
});

/******* Asignments API *******/

// GET ALL ASSIGNMENTS
router.get('/meeting/:meeting_id/assignments/list', isAuthenticated, validateObjectID, (req, res, next) => {
  let meeting_id = req.params.meeting_id;

  Meeting.findById(meeting_id).then((meeting, err) => {
    if (err) return res.status(404).json({ message: 'Could not find that meeting' });

    res.status(200).json({
      assignments: meeting.assignments,
    });
  });
});

// CREATE AN ASSIGNMENT
router.post('/meeting/:meeting_id/assignments/create', isAuthenticated, validateObjectID, (req, res, next) => {
  let meeting_id = req.params.meeting_id;

  Meeting.findById(meeting_id).then((meeting, err) => {
    if (err) return res.status(404).json({ message: 'Could not find that meeting' });

    meeting.assignments.push({
      description: req.body.description,
      dueDate: new Date(req.body.dueDate),
      assignedBy: meeting.mentorID,
      assignedTo: meeting.studentID,
    });
    meeting.save();
    res.status(201).json({
      meeting,
      assignment: meeting.assignments[meeting.assignments.length - 1],
      message: 'A new assignment has been created!',
    });
  });
});

// GET ASSIGNMENT BY ID
router.get('/meeting/:meeting_id/assignments/:assignment_id', isAuthenticated, validateObjectID, (req, res, next) => {
  let meeting_id = req.params.meeting_id;
  let assignment_id = req.params.assignment_id;

  Meeting.findById(meeting_id).then((meeting, err) => {
    if (err) return res.status(404).json({ message: 'Could not find that meeting' });
    let assignment = meeting.assignments.id(mongoose.Types.ObjectId(assignment_id));

    if (!assignment) return res.status(404).json({ message: 'An assignment with that ID could not be found.' });
    res.status(200).json({ assignment });
  });
});
// UPDATE AN ASSIGNMENT
router.patch('/meeting/:meeting_id/assignments/:assignment_id', isAuthenticated, validateObjectID, (req, res, next) => {
  let meeting_id = req.params.meeting_id;
  let assignment_id = req.params.assignment_id;

  let { description, dueDate, isComplete } = req.body;

  Meeting.findById(meeting_id).then((meeting, err) => {
    if (err) return res.status(404).json({ message: 'Could not find that meeting' });

    let assignment = meeting.assignments.id(mongoose.Types.ObjectId(assignment_id));
    let completeDate = isComplete ? new Date() : null;

    if (!assignment) return res.status(404).json({ message: 'An assignment with that ID could not be found.' });
    assignment.set({
      description,
      dueDate,
      isComplete,
      completeDate,
    });
    // Save the meeting so that the sub documents can be updated
    meeting.save();
    res.status(200).json({ assignment });
  });
});
// DELETE AN ASSIGNMENT
router.delete(
  '/meeting/:meeting_id/assignments/:assignment_id',
  isAuthenticated,
  validateObjectID,
  (req, res, next) => {
    let meeting_id = req.params.meeting_id;
    let assignment_id = req.params.assignment_id;

    Meeting.findById(meeting_id).then((meeting, err) => {
      if (err) return res.status(404).json({ message: 'Could not find that meeting' });

      meeting.assignments.id(mongoose.Types.ObjectId(assignment_id)).remove();

      // Save the meeting so that the sub documents can be updated
      meeting.save();
      res.status(200).json({ message: 'Assignment removed successfully' });
    });
  }
);

module.exports = router;
