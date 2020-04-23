var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var songSchema = new Schema({
    name: String,
    duration: Number,
    genres: [String],
    next_song: Schema.Types.ObjectId,
    id_artist: Schema.Types.ObjectId,
    id_album: Schema.Types.ObjectId
    });

module.exports = songSchema;
    // module.exports = mongoose.model('songs', songSchema );