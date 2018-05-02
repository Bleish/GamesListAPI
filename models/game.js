var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var GameSchema = new Schema({
    name: { type: String, required: true },
    system: { type: String, required: true },
    releaseDate: { type: Number, required: true }
});

module.exports = mongoose.model('Game', GameSchema);