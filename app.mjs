// Import modules
import express from 'express'; // ES6 method
// const express = require('express'); // CJS method
import mongoose from 'mongoose';
import routes from './routes';

const port = 3000;

// Create Express application
let app = express();

// Set up mongoose connection
let dbConnectionString = 'mongodb://localhost/gameslist';
mongoose.connect(dbConnectionString);
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:')); // Bind connection to error event

// let newGame = new Game({
//     name: 'Metroid Prime',
//     system: 'GameCube',
//     releaseDate: 2002
// });

// newGame.save(function(error, Game){
//     if (error) {
//         console.log('An error has occured when writing to the database.');
//     }
//     else{
//         console.log('New game successfully added to the database.');
//     }
// })

// Game.findOne({name: 'Metroid Prime'}, function(error, response){
//     console.log(response);
// });

app.use(routes); // ES6 method
// app.use(require('./routes')); // CJS method

let server = app.listen(port);

export { server }; // For mocha testing
