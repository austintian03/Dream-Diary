// 1ST DRAFT DATA MODEL
const mongoose = require('mongoose');
const URLSlugs = require('mongoose-url-slugs')
//mongoose.promise = global.Promise;
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
const DreamSchema = new mongoose.Schema({
  //user: {type: mongoose.Schema.Types.ObjectId, ref:'User'},
  date: {type: String, default: Date.now()},
  title: String,
  dream: String,
  thoughts: String
});

DreamSchema.plugin(URLSlugs('date title', {field: 'myslug'}));
//mongoose.model('User', User);
mongoose.model('Dream', DreamSchema);

const uri = process.env.MONGODB_URI || "mongodb+srv://adt339:MYjtx24yas7C75qb@dreamdb.a55jq.mongodb.net/dreamdiarydb?retryWrites=true&w=majority";
mongoose.Promise = global.Promise;

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true});

mongoose.connection.on('connected', () => {
    console.log('Mongoose is connected...');
});


/*
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true})
.then(() => {
  console.log('MongoDB Connected…')
})
.catch(err => console.log(err));
*/

//local db testing
//mongoose.connect('mongodb://localhost/dreamdb', { useNewUrlParser: true, useUnifiedTopology: true})
// TODO: add remainder of setup for slugs, connection, registering models, etc. below