//
// server.js

// set up ======================================================================
// get all the modules we need
var express  = require('express');
var app      = express();
var port     = process.env.PORT || 5500;
const MongoClient = require('mongodb').MongoClient
var mongoose = require('mongoose');
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
var passport = require('passport');
var flash    = require('connect-flash');

var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');
const ObjectId = require('mongodb').ObjectID

var configDB = require('./config/database.js');

var db

// configuration ===============================================================
mongoose.connect(configDB.url, (err, database) => {
  if (err) return console.log(err)
  db = database
  require('./app/routes.js')(app, passport, db);
}); // connect to our database

require('./config/passport')(passport); // pass passport for configuration

// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.json()); // get information from html forms
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'))


app.set('view engine', 'ejs'); // set up ejs for templating

// required for passport
app.use(session({
    secret: 'rcbootcamp2021b', // session secret
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session


// launch ======================================================================
app.listen(port);
console.log('The magic happens on port ' + port);
















// const app = express();
// const bodyParser= require('body-parser')
// const MongoClient = require('mongodb').MongoClient
// const ObjectId = require('mongodb').ObjectID



// app.listen(4000, function() {
//     console.log('listening on 3000')
// })


// MongoClient.connect('mongodb+srv://troi:Troiana123@cluster0.lyfc9.mongodb.net/star-wars?retryWrites=true&w=majority', { useUnifiedTopology: true })  
//   .then(client => {
//     console.log('Connected to Database')
//     const db = client.db('star-wars-quotes')
//     const quotesCollection = db.collection('movies')
    
//     app.set('view engine', 'ejs')
    
//     app.use(bodyParser.urlencoded({ extended: true }))
//     app.use(bodyParser.json())
//     app.use(express.static('public'))
//     app.listen(4001, function() {
//       console.log('listening on 3000')
//     })
//     var port = process.env.PORT || '3000'
   
//    app.listen(port, err => {
//     if (err)
//         throw err
//     console.log('Server listening on port', port)
//     })
    
//   app.get('/', (req, res) => {
//     db.collection('movies').find().toArray((err, result) => {
//       if (err) return console.log(err)
//       res.render('index.ejs', {
//         movies: result
//       })
//     })
//   })

//   app.post('/movies', (req, res) => {
//     db.collection('movies').insertOne({
//       date: req.body.date, 
//       log: req.body.log, 
//       likes: 0, 
//       favorited: false
//     }, (err, result) => {
//       if (err) return console.log(err)
//       console.log('saved to database')
//       res.redirect('/')
//     })
//   })
  
//   app.put('/favorite', (req, res) => {
//     console.log('hey im the id ' ,req.body)
//     db.collection('movies')

//     .findOneAndUpdate({
//       _id: ObjectId(req.body.id)
//     }, {
//       $set: {
//         favorited: true
//       }
//     }, {
//       sort: {_id: -1},
//       upsert: true
//     }, (err, result) => {
//       if (err) return res.send(err)
//       res.send(result)
//     })
//   })
  
//   app.delete('/movies', (req, res) => {
//     db.collection('movies').findOneAndDelete({
//       date: req.body.date, 
//       log: req.body.log}, (err, result) => {
//       if (err) return res.send(500, err)
//       res.send('Message deleted!')
//     })
//   })
  
    
// })
  
