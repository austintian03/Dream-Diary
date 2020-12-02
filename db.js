const mongoose = require('mongoose');
const URLSlugs = require('mongoose-url-slugs')
const passportLocalMongoose = require('passport-local-mongoose');
//mongoose.promise = global.Promise;

// users
// * our site requires authentication...
// * so users have a username and password
// * can have 0 or more dreams
const UserSchema = new mongoose.Schema({
  //username provided by authentication plugin
  //password hash provided by authentication plugin
  //dreams: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Dream'}]
});
UserSchema.plugin(passportLocalMongoose);

// a dream
// * each dream must have a related user, date/timestamp, and dream text
// * thoughts are optional and can be added later
const DreamSchema = new mongoose.Schema({
  user: {type: mongoose.Schema.Types.ObjectId, ref:'User'},
  date: String,
  title: String,
  dream: String,
  thoughts: String
});

DreamSchema.plugin(URLSlugs('date title', {field: 'myslug', update: true}));
mongoose.model('User', UserSchema);
mongoose.model('Dream', DreamSchema);

const uri = process.env.MONGODB_URI || 'mongodb://localhost/dreamTester';
mongoose.Promise = global.Promise;

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true});

mongoose.connection.on('connected', () => {
    console.log('Mongoose is connected...');
});