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

app.listen(3000, () => {
  console.log('Serve Ready on port 3000');
});
