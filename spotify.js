var express = require('express'); // Express web server framework
var request = require('request'); // "Request" library
var app = express();
var querystring = require('querystring');
var cookieParser = require('cookie-parser');

var client_id = 'ed4c50af50df42e58a44b1ef421ba0e9'; // Your client id
var client_secret = '8800ba4c79844a48b7a9212fbfce191f'; // Your secret
var redirect_uri = 'http://localhost:8000/callback'; // Your redirect uri

/**
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */
var generateRandomString = function(length) {
  var text = '';
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

var stateKey = 'spotify_auth_state';

app.use(express.static(__dirname + '/public'))
   .use(cookieParser());

// Authenticate user so that we can add music to their playlist
app.get('/login', function(req, res) {

  var state = generateRandomString(16);
  res.cookie(stateKey, state);

  // your application requests authorization
  var scope = 'user-read-private user-read-email playlist-modify-private';
  res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: client_id,
      scope: scope,
      redirect_uri: redirect_uri,
      state: state
    }));
});

app.get('/callback', function(req, res) {
  console.log("I'm curious. Does it get here?");
})

// Pass whatever the crawler results over to spotify

// Search for artists
  // "https://api.spotify.com/v1/search?q=tania*&type=artist"

// if found, then find one top track

// Add it to a Spotify playlist







console.log('Listening on 8000');
app.listen(8000);
