const mongoose = require('mongoose');
const { Schema } = mongoose;
const ObjectId = mongoose.SchemaTypes.ObjectId;

const AssignmentSchema = new Schema({
    description: {
        type: String,
        required: "There must be a description for each assignment"
    },
    dueDate: {
        type: Date
    },
    isComplete: {
        type: Boolean,
        default: false
    },
    completeDate: {
        type: Date
    },
    assignedBy: {
        type: ObjectId,
        ref: 'User'
    },
    assignedTo: {
        type: ObjectId,
        ref: 'User'
    }
});
module.exports = AssignmentSchema;