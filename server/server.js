var express = require('express')
var app = express()
var cors = require('cors')
var mongoose = require('mongoose')
var bodyParser = require('body-parser')
var jwt = require('jwt-simple')

var auth = require('./auth.js')
var User = require('./models/User.js')

app.use(cors())
app.use(bodyParser.json())

function checkAuthenticated(req, res, next) {
  if(!req.header('authorization'))
    return res.status(401).send({message: 'Unauthorized. Missing Auth Header'})

  var token = req.header('authorization').split(' ')[1]

  var payload = jwt.decode(token, '123')
  if(!payload)
    return res.status(401).send({message: 'Unauthorized. Header Invalid'})

  req.userId = payload.sub
  next()
}

app.get('/profile', checkAuthenticated, async (req, res) => {
  try {
    var user = await User.findById(req.userId, '-password -__v')
    res.send(user)
  } catch (error) {
      console.error(error)
      res.sendStatus(500)
  }
})

// app.put('/profile', checkAuthenticated, async (req, res) => {
//   var userData = req.body
//   if(userData.profile.) {
//
//   }
//   var user = new User(userData)
//   user.save((err, newUser) => {
//     if (err)
//       return res.status(401).send({message: 'Error saving user'})
//   });
//   return res.status(200).send(user)
// })

app.post('/register', auth.register)

app.post('/login', auth.login)

// connect to local mongo instance
mongoose.connect('mongodb://localhost:27017/workout-db', (err) => {
  if(!err)
    console.log('connected to mongo')
})

app.listen(3000, () => {
  console.log('Serve Ready on port 3000');
});
