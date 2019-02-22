var User = require('./models/User.js')
var jwt = require('jwt-simple')
var bcrypt = require('bcrypt-nodejs')

module.exports = {
  register: (req, res) => {
    var userData = req.body
    var user = new User(userData)
    user.save((err, newUser) => {
      if (err)
        return res.status(401).send({message: 'Error saving user'})

      createAndSendToken(res, newUser)
    });
  },
  login: async (req, res) => {
    var loginData = req.body
    var user = await User.findOne({email: loginData.email})

    if (!user)
      return res.status(401).send({message: 'Email or Password invalid'})

    //compares the hashed passwords
    bcrypt.compare(loginData.password, user.password, (err, isMatch) => {
      if (!isMatch)
        return res.status(401).send({message: 'Email or Password invalid'})

      createAndSendToken(res, user)
    })
  }
}

function createAndSendToken(res, user) {
  var payload = { sub: user._id }
  var token = jwt.encode(payload, '123'); //TODO: will want to put the secret in a config file

  res.status(200).send({token})
}
