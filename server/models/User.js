var mongoose = require('mongoose')
var bcrypt = require('bcrypt-nodejs')

var userSchema = new mongoose.Schema({
  email: String,
  password: String,
  profile: {
    firstName: String,
    lastName: String,
    height: Number,
    weight: Number,
    gender: String,
    bodyFatPercent: Number,
    dob: String
  }
})

userSchema.pre('save', function (next) {
  var user = this

  if(!user.isModified('password'))
    return next()

  bcrypt.hash(user.password, null, null, (err, hash) => {
    if(err) return next(err)
    user.password = hash
    next()
  })
})

module.exports = mongoose.model('User', userSchema)
