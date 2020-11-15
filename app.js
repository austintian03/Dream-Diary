require('./db');
const express = require('express');
const path = require('path');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session)
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
//const bodyParser = require('body-parser');

const app = express();
const sessStore = new MongoDBStore({
    uri: process.env.MONGODB_URI, //|| 'mongodb://localhost/dreamTester'
    collection: 'sessions'
})

sessStore.on('error', function(error) {
    console.log(error);
});

const mongoose = require('mongoose');
const Dream = mongoose.model('Dream');
const User = mongoose.model('User');

//authentication configuration
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// enable sessions
const sessionOptions = {
    secret: 'dreamy cookie (store this elsewhere!)',
    store: sessStore,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week
    },
    resave: false,
    saveUninitialized: false
};
app.use(session(sessionOptions));

//initilialize passport
app.use(passport.initialize());
app.use(passport.session());

//make user data available to all templates
app.use((req, res, next) => {
    //res.locals.message;
    res.locals.user = req.user;
    next();
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// body parser setup
app.use(express.urlencoded({ extended: false }));

// serve static files
app.use(express.static(path.join(__dirname, 'public')));


//route handlers
app.get('/', (req, res) => {
    if(req.user) {
        res.redirect('/dreams');
    }
    else {
        res.render('index', {message: req.session.message});
    }
});

app.get('/dreams', (req, res) => {
    if(!req.user) { 
        res.redirect('/') 
    }
    else {
        Dream.find({user: req.user._id}, (err, dreams) => {
            if(err) {
                console.log(err);
            }
            else {
                res.render('dreams', {dreams: dreams});
            }
        }) 
    }
});

app.get('/dreams/:dreamSlug', (req, res) => {
    if(!req.user) { 
        res.redirect('/') 
    }
    else {
        const slug = req.params.dreamSlug;
        Dream.findOne({user: req.user._id, myslug: slug}, (err, dream) => {
            if(err) {
                console.log(err);
            }
            else {
                res.render('dream-slug', {dream: dream});
            }
        });
    }
    
});

app.get('/dreams/:dreamSlug/edit', (req, res) => {
    if(!req.user) { 
        res.redirect('/') 
    }
    else {
        const slug = req.params.dreamSlug;
        Dream.findOne({user: req.user._id, myslug: slug}, (err, dream) => {
            if(err) {
                console.log(err);
            }
            else {
                res.render('edit-dream', {dream: dream});
            }
        });
    }
})

app.post('/dreams/:dreamSlug/edit', (req, res) => {
    const slug = req.params.dreamSlug;
    const filter = {user: req.user._id, myslug: slug};
    /*
    const update = {
        $set: {
            date: req.body.date.toString(), 
            title: req.body.title,
            dream: req.body.dream,
            thoughts: req.body.thoughts
        }
    }
    */

    Dream.findOne(filter, (err, dream) => {
        if(err) {
            console.log(err);
        }   
        else {
            dream.date = req.body.date.toString();
            dream.title = req.body.title;
            dream.dream = req.body.dream;
            dream.thoughts = req.body.thoughts;
            dream.save((err) => {
                if(!err) {
                    res.redirect(`/dreams/${slug}`);
                }
                else {
                    console.log(err);
                }
            });
        }
    })

    /*
    Dream.findOneAndUpdate(filter, update, (err) => {
        if(err) {
            console.log(err);
        }   
        else {
            res.redirect(`/dreams/${slug}`);
        }
    })*/
});

app.get('/record', (req, res) => {
    if(!req.user) { 
        res.redirect('/') 
    }
    else {
        res.render('record');
    }
});

app.post('/record', (req, res) => {
    const newDream = new Dream({
        user: req.user._id,
        date: req.body.date.toString(),
        title: req.body.title,
        dream: req.body.dream,
        thoughts: req.body.thoughts
    });

    newDream.save((err) => {
            if(!err) {
                res.redirect('/dreams');
            }
            else {
                console.log(err);
            }
    });
});

app.post('/login', function(req,res,next) {
    passport.authenticate('local', function(err,user) {
        if(user) {
            req.logIn(user, function(err) {
                req.session.save(function (err) {
                    if (err) {
                        return next(err);
                    }
                    res.redirect('/dreams');
                });
            });
        } 
        else {
            req.session.message = 'Your login or password is incorrect.';
            res.redirect('/');
            //res.render('index', {message:'Your login or password is incorrect.'});
        }
    })(req, res, next);
});
  
app.post('/register', function(req, res) {
    User.register(new User({username:req.body.username}), req.body.password, function(err, user){
        if (err) {
            req.session.message = 'Your registration information is not valid';
            res.redirect('/');
            //res.render('index', {message:'Your registration information is not valid'});
        } 
        else {
            passport.authenticate('local')(req, res, function() {
                req.session.save(function (err) {
                    if (err) {
                        return next(err);
                    }
                    res.redirect('/dreams');
                });
            });
        }
    });   
});

app.post('/logout', (req, res) => {
    req.logout();
    req.session.destroy();
    res.redirect('/');
});

app.listen(process.env.PORT || 3000);
