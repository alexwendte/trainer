const mongoose = require('mongoose');
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

// generate a hashed password
UserSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
UserSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};
const User = mongoose.model('User', UserSchema);

module.exports = User;