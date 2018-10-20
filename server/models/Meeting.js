const mongoose = require('mongoose');
const { Schema } = mongoose;
const ObjectId = mongoose.SchemaTypes.ObjectId;

const Assignment = require('./Assignment');


const MeetingSchema = new Schema({
    meetingDate: {
        type: Date,
        require: "A meeting date is required"
    },
    created: {
        type: Date
    },
    mentorID: {
        type: ObjectId,
        ref: 'User',
        required: "There must be a mentor at every meeting"
    },
    studentID: {
        type: ObjectId,
        ref: 'User',
        required: "There must be a student at every meeting"
    },
    // Agenda is basically the description of the meeting
    agenda: {
        type: String,
    },
    title: {
        type: String,
        required: "There must be a meeting title"
    }
});

const Meeting = mongoose.model('Meeting', MeetingSchema);

module.exports = Meeting;