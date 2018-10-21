const mongoose = require('mongoose');
const { Schema } = mongoose;
const ObjectId = mongoose.SchemaTypes.ObjectId;
const AssignmentSchema = require('./Assignment');

const MeetingSchema = new Schema({
  meetingDate: {
    type: Date,
    require: 'A meeting date is required',
  },
  created: {
    type: Date,
    default: Date.now(),
  },
  mentorID: {
    type: ObjectId,
    ref: 'User',
    required: 'There must be a mentor at every meeting',
  },
  studentID: {
    type: ObjectId,
    ref: 'User',
    required: 'There must be a student at every meeting',
  },
  // Agenda is basically the description of the meeting
  agenda: {
    type: String,
  },
  title: {
    type: String,
    required: 'There must be a meeting title',
  },
  assignments: [
    {
      type: ObjectId,
      ref: 'Assignment',
    },
  ],
  assignments: [AssignmentSchema],
  isAccepted: {
    type: Boolean,
    default: false,
  },
  initialMessage: String,
  transactionID: String
});

const Meeting = mongoose.model('Meeting', MeetingSchema);

module.exports = Meeting;
