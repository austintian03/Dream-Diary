// 1ST DRAFT DATA MODEL
const mongoose = require('mongoose');

// users
// * our site requires authentication...
// * so users have a username and password
// * can have 0 or more dreams
const User = new mongoose.Schema({
  //username provided by authentication plugin
  //password hash provided by authentication plugin
  dreams: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Dream'}]
});

// a dream
// * each dream must have a related user, date/timestamp, and dream text
// * thoughts are optional and can be added later
const Dream = new mongoose.Schema({
  user: {type: mongoose.Schema.Types.ObjectId, ref:'User'},
  date: {type: Date, required: true},
  dream: {type: String, required: true},
  thoughts: {type: String}
});

// TODO: add remainder of setup for slugs, connection, registering models, etc. below