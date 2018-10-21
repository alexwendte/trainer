const mongoose = require('mongoose');
const { Schema } = mongoose;
const ObjectId = mongoose.SchemaTypes.ObjectId;
const bcrypt = require('bcrypt');

const UserSchema = new Schema({
  name: {
    type: String,
    required: 'A name is required',
  },
  email: {
    type: String,
    required: 'Email is required',
    unique: true,
  },
  password: {
    type: String,
    required: 'Password is required, duh',
  },
  isMentor: Boolean,
  isStudent: Boolean,
  career: String,
  bio: String,
  rate: Number,
  category: String,
  phoneNumber: {
    type: String,
    required: 'Phone Number is required',
  },
  review: Number,
  avatar: String,
});

// generate a hashed password
UserSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
UserSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};
const User = mongoose.model('User', UserSchema);

module.exports = User;
