// Import modules
import express from 'express'; // ES6 method
// const express = require('express'); // CJS method
import config from 'config';
import mongoose from 'mongoose';
import routes from './routes';

// Create Express application
let app = express();

// Set up mongoose connection
let dbConnectionString = `mongodb://${config.db.host}/${config.db.name}`;
mongoose.connect(dbConnectionString);
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:')); // Bind connection to error event

app.use(routes); // ES6 method
// app.use(require('./routes')); // CJS method

let server = app.listen(config.app.port);

export {
    server
}; // For mocha testing