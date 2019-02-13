var express = require('express')
var app = express()
var cors = require('cors')
var mongoose = require('mongoose')
var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;


var User = require('./models/User.js')

var posts = [
  {message: 'hello'},
  {message: 'hi'}
]

app.use(cors())

app.get('/posts', (req, res) => {
  res.send(posts)
})

//login authentication
passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ username: username }, function(err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
));

//routing
app.post('/login',
  passport.authenticate('local', { successRedirect: '/dashboard',
                                   failureRedirect: '/login',
                                   failureFlash: true })
);

// app.post('/login', passport.authenticate('local'),
//   function(req, res) {
//     res.redirect()
//   });
//
// mongoose.connect('mongodb://localhost:27017/', { useMongoClient: true}, (err) => {
//   if(!err)
//     console.log('connected to mongo');
// })

app.listen(3000)
