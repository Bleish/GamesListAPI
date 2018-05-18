// Import modules
import express from 'express';
import config from 'config';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import routes from './routes';

// Create Express application
let app = express();

// Set up body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Set up Mongoose/Mongo connection
let dbConnectionString = `mongodb://${config.db.host}/${config.db.name}`;
mongoose.connect(dbConnectionString);
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:')); // Bind connection to error event

app.use(routes);

// For Mocha testing
export let server = app.listen(config.app.port);