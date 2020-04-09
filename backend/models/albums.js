var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var albumSchema = new Schema({
    name: String,
    launch_date: Date,
    id_company: Number,
    id_artist: Number
});

module.exports = mongoose.model('albums', albumSchema );