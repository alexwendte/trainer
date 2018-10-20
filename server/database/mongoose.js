const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose
  .connect(
    process.env.MONGODB_URI,
    { useNewUrlParser: true }
  )
  .then(connection => {
    console.log(`Mongo Database Connected at ${process.env.MONGODB_URI}`);
  })
  .catch(err => {
    console.error(
      'Database Connection Failed. Make sure your mongodb is running with the command mongod',
      err.messages
    );
  });

module.exports = { mongoose };
