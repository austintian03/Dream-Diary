require('./db');

const express = require('express');
const path = require('path');
//const bodyParser = require('body-parser');

const app = express();

const mongoose = require('mongoose');
const Dream = mongoose.model('Dream');

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

app.use((req, res, next) => {
    const uri = process.env.MONGODB_URI;
    mongoose.Promise = global.Promise;

    mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log('MongoDB Connected…')
    })
    .catch(err => console.log(err));
    
    next();
});

app.get('/', (req, res) => {
    Dream.find((err, dreams) => {
        if(err) {
            console.log(err);
            //res.render('dreams', {dreams: {}});
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
    });
});

app.listen(process.env.PORT || 3000);
