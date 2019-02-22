var express = require('express')
var app = express()
var cors = require('cors')
var mongoose = require('mongoose')
var User = require('./models/User.js')

var posts = [
  {message: 'hello'},
  {message: 'hi'}
]

app.use(cors())

app.get('/posts', (req, res) => {
  res.send(posts)
})

mongoose.connect('mongodb://localhost:27017/', (err) => {
  if(!err)
    console.log('connected to mongo');
})

app.listen(3000)
