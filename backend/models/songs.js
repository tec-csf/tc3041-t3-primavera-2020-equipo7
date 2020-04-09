var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var songSchema = new Schema({
    name: String,
    duration: Number,
    genres: [String],
    id_artist: Number,
    id_album: Number,
    });

    module.exports = mongoose.model('songs', songSchema );