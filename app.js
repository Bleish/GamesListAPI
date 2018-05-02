// Import modules
var express = require('express');
var mongoose = require('mongoose');

// Create Express application
var app = express();

// Set up mongoose connection
var dbConnectionString = 'mongodb://localhost/gameslist';
mongoose.connect(dbConnectionString);
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:')); // Bind connection to error event

// var newGame = new Game({
//     name: "Metroid Prime",
//     system: "GameCube",
//     releaseDate: 2002
// });

// newGame.save(function(error, Game){
//     if (error) {
//         console.log("An error has occured when writing to the database.");
//     }
//     else{
//         console.log("New game successfully added to the database.");
//     }
// })

// Game.findOne({name: "Metroid Prime"}, function(error, response){
//     console.log(response);
// });

app.use(require('./routes'));

app.listen(3000);
