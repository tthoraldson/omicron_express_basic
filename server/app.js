var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');

var songs = []; //stores our songs

app.set('port', process.env.PORT || 3000);

app.use(bodyParser.urlencoded({ extended: true }));
/**
 * POST /songs
 *
 * Places song into songs array
 */


app.post('/songs', function (req, res) {
  var d = new Date();
  var song = req.body;
  var title = song.title;
  var dateAdded = (d.getMonth() + 1) + '-' + (d.getDate()) + '-' + d.getFullYear();
  var artist = song.artist;
  song.dateAdded = dateAdded;

  var unique = true;
  for (var i = 0; i < songs.length; i++){
    console.log("le loop");
    if (title === songs[i].title){
      if (artist === songs[i].artist){
        unique = false;
      }
    }
    else if (artist === songs[i].artist){
      if (title === songs[i].title){
        unique = false;
      }
    }
  }

  if (artist === ""){
    res.sendStatus(400);
    alert("Please enter an Artist!");
  }
  else if (title === ""){
    res.sendStatus(400);
        alert("Please enter a Title!");
  }
  else if(unique === false){
    res.sendStatus(400);
  }
  else {
    console.log("ELSE");
        songs.push(song);
        console.log(songs);
        res.sendStatus(200);
  };
});

app.get('/songs', function (req, res) {
  res.send(songs);
});

app.get('/*', function (req, res) {
  var file = req.params[0] || '/views/index.html';

  console.log('What is in req.params[0]?', req.params[0]);

  res.sendFile(path.join(__dirname, './public', file));
});

app.listen(app.get('port'), function () {
  console.log('Server now running at port ', app.get('port'));
});
