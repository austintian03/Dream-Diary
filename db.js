// 1ST DRAFT DATA MODEL
const mongoose = require('mongoose');
mongoose.promise = global.Promise;
// users
// * our site requires authentication...
// * so users have a username and password
// * can have 0 or more dreams
/*
const User = new mongoose.Schema({
  //username provided by authentication plugin
  //password hash provided by authentication plugin
  dreams: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Dream'}]
});*/

// a dream
// * each dream must have a related user, date/timestamp, and dream text
// * thoughts are optional and can be added later
const Dream = new mongoose.Schema({
  //user: {type: mongoose.Schema.Types.ObjectId, ref:'User'},
  date: Date,
  dream: String,
  thoughts: String
});

//mongoose.model('User', User);
mongoose.model('Dream', Dream);

const uri = process.env.MONGODB_URI;


mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true})
.then(() => {
  console.log('MongoDB Connected…')
})
.catch(err => console.log(err));


//mongoose.connect('mongodb://localhost/dreamdb', { useNewUrlParser: true, useUnifiedTopology: true})
// TODO: add remainder of setup for slugs, connection, registering models, etc. below