var request = require('request');
var cheerio = require('cheerio');
var URL = require('url-parse');

var pageToVisit = "http://www.pitchfork.com/";
var pageToVisit2 = "http://calipermusic.blogspot.com/";


module.exports = function(options) {
  var seneca = this;

  seneca.add({role:'crawler', cmd:'find_albums'}, function (args, callback) {

  request(pageToVisit, function(error, response, body) {
     console.log("IS IT GETTING HERE AT ALL");
     if(error) {
       console.log("Error: " + error);
     }
     // Check status code (200 is HTTP OK)
     console.log("Status code: " + response.statusCode);
     if(response.statusCode === 200) {
       // Parse the document body
       var $ = cheerio.load(body);
       console.log("Page title:  " + $('title').text());

       var albumsAndArtists = [];

       $('.album-details ul').each(function(i, elem) {
          albumsAndArtists[i] = $(this).text();
       });

       console.log('Here are the albums: ', albumsAndArtists)
       callback(null, albumsAndArtists);
     }

  });
})
  
}


// function collectInternalLinks($) {
//         var allRelativeLinks = [];

//         var relativeLinks = $("a[href^='/']");
//         relativeLinks.each(function() {
//             allRelativeLinks.push($(this).attr('href'));

//         });

//         console.log("Found " + allRelativeLinks.length + " relative links");
//       }

//      collectInternalLinks($);



// Words to search for: Jazz, experimental, classical
// function searchForWord($, word) {
//   var bodyText = $('html > body').text();
//   if(bodyText.toLowerCase().indexOf(word.toLowerCase()) !== -1) {
//     return true;
//   }
//   return false;
// }








