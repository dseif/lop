var express = require('express');
var http = require( 'http' );
var app = express();

var token = "";

app.get( "/getkeywords", function( req, res ) {
  var data = req.query,
      options;

  options = {
        "host": "gdata.youtube.com",
        "path": "/feeds/api/videos?q=Tactical+Storytelling&auther=LandOfOpp&alt=json",
        "port": 80,
        "headers": {
          "Authorization": "Bearer " + token,
          "GData-Version": 2
        }
      };

  http.get( options, function( rez ) {
    var data = "";

    rez.on( "data", function( chunk ) {
      data += chunk;
    })
    .on( "end", function() {
      res.send( data );
    });
  });
});

app.get( "/*", function( req, res ) {
  var file;
  if ( [ "/", "/oauth2callback" ].indexOf( req.url ) > -1 ) {
    file = "index.html";
  } else {
    file = req.url.substring( 1 );
  }
  res.sendfile( file );
});

app.get( "/oauth2callback", function( req, res ) {
  res.sendfile( "index.html" );
});

app.post( "/getcaptions", function( req, res ) {
  var data = req.query,
      options,
      url;

  token = data.token;

  if ( data.caption_id === undefined ) {
    url = "/feeds/api/videos/" + data.data + "/captions";
  } else {
    url =  "/feeds/api/videos/" + data.data + "/captiondata/" + data.caption_id;
  }
  options = {
        "host": "gdata.youtube.com",
        "path": url,
        "port": 80,
        "headers": {
          "Authorization": "Bearer " + data.token,
          "GData-Version": 2
        }
      };

  http.get( options, function( rez ) {
    var data = "";

    rez.on( "data", function( chunk ) {
      data += chunk;
    })
    .on( "end", function() {
      res.send( data );
    });
  });
});

app.listen(8888);
