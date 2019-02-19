var express = require('express')
var app = express()
var cors = require('cors')
var mongoose = require('mongoose')
const OktaJwtVerifier = require('@okta/jwt-verifier');

const oktaJwtVerifier = new OktaJwtVerifier({
  issuer: 'https://dev-199481.oktapreview.com/oauth2/default',
  clientId: '0oajdeqohemJ1Ny6A0h7',
  assertClaims: {
    aud: 'api://default',
  },
});

var User = require('./models/User.js')

app.use(cors())

/**
* A simple middleware that asserts valid access tokens and sends 401 responses
* if the token is not present or fails validation.  If the token is valid its
* contents are attached to req.jwt
*/
function authenticationRequired(req, res, next) {
 const authHeader = req.headers.authorization || '';
 const match = authHeader.match(/Bearer (.+)/);

 if (!match) {
   return res.status(401).end();
 }

 const accessToken = match[1];

 return oktaJwtVerifier.verifyAccessToken(accessToken)
   .then((jwt) => {
     req.jwt = jwt;
     next();
   })
   .catch((err) => {
     res.status(401).send(err.message);
   });
}

/**
 * An example route that requires a valid access token for authentication, it
 * will echo the contents of the access token if the middleware successfully
 * validated the token.
 */
app.get('/dashboard', authenticationRequired, (req, res) => {
  res.json(req.jwt);
});

/**
 * Another example route that requires a valid access token for authentication, and
 * print some messages for the user if they are authenticated
 */
app.get('/api/messages', authenticationRequired, (req, res) => {
  res.json([{
    message: 'Hello, word!'
  }]);
});

app.post('/login', (req, res) => {
  console.log(req.body)
})


app.listen(3000, () => {
  console.log('Serve Ready on port 3000');
});
