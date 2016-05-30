'use strict';

var seneca = require('seneca')();

seneca.use('./crawler.js');

seneca.act({role:'crawler', cmd:'find_albums'}, function(err, result) {
  console.log(result);
})

