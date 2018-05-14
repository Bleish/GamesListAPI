import mongoose from 'mongoose';

let Schema = mongoose.Schema;

let gameSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    system: {
        type: String,
        required: true
    },
    releaseDate: {
        type: Number,
        required: true
    }
});

export default mongoose.model('Game', gameSchema);