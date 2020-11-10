require('./db');

const express = require('express');
const path = require('path');
//const bodyParser = require('body-parser');

const app = express();

const mongoose = require('mongoose');
const Dream = mongoose.model('Dream');

/*
const uri = process.env.MONGODB_URI || "mongodb+srv://adt339:MYjtx24yas7C75qb@dreamdb.a55jq.mongodb.net/dreamdiarydb?retryWrites=true&w=majority";
mongoose.Promise = global.Promise;

//MYjtx24yas7C75qb
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true});

mongoose.connection.on('connected', () => {
    console.log('Mongoose is connected...');
});


// schema
const DreamSchema = new mongoose.Schema({
    date: {type: String, default: Date.now()},
    dream: String,
    thoughts: String
});
*/

//model
//const Dream = mongoose.model('Dream', DreamSchema);

/*
//saving data to mongodb
const data = {
    dream: 'stuck in a never-ending nightmare of deployment',
    thoughts: 'worst dream ever'
};

const newDream = new Dream(data)
//.save();
newDream.save((err) => {
    if(err) {
        console.log("oh narts :(");
    }
    else {
        console.log('Dream has been recorded.')
    }
});*/

// enable sessions
/*
const session = require('express-session');
const sessionOptions = {
    secret: 'secret cookie thang (store this elsewhere!)',
    resave: true,
    saveUninitialized: false
};
app.use(session(sessionOptions));
*/

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// body parser setup
app.use(express.urlencoded({ extended: false }));

// serve static files
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    Dream.find((err, dreams) => {
        if(err) {
            console.log(err);
        }
        else {
            res.render('dreams', {dreams: dreams});
        }
    })
});

app.get('/record', (req, res) => {
    res.render('record');
});

app.post('/record', (req, res) => {
    const newDream = new Dream({
        date: req.body.date,
        dream: req.body.dream,
        thoughts: req.body.thoughts
    });

    newDream.save((err) => {
            if(!err) {
                res.redirect('/');
            }
            else {
                console.log(err);
            }
    });
});

app.listen(process.env.PORT || 5000);
