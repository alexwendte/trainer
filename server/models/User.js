mongoose = require('mongoose');
const { Schema } = mongoose;
const ObjectId = mongoose.SchemaTypes.ObjectId;

const UserSchema = new Schema ({
    email: {
        type: String,
        required: "Email is required",
        unique: true,
    }, 
    password: {
        type: String,
        required: "Password is required, duh",
    },
    is_mentor: Boolean,
    is_student: Boolean,
    career: String,
    bio: String
});

const User = mongoose.model('User', UserSchema);

module.exports = User;