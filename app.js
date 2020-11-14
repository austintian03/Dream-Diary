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

app.get('/dreams/:dreamSlug', (req, res) => {
    const slug = req.params.dreamSlug;
    Dream.findOne({myslug: slug}, (err, dream) => {
        if(err) {
            console.log(err);
        }
        else {
            res.render('dream-slug', {dream: dream});
        }
    });
});

app.get('/record', (req, res) => {
    res.render('record');
});

app.post('/record', (req, res) => {
    const newDream = new Dream({
        date: req.body.date.toString(),
        title: req.body.title,
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

app.listen(process.env.PORT || 3000);
