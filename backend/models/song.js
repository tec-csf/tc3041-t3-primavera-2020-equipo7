var mongoose = require('mongoose')
var Schema = mongoose.Schema

var songSchema = new Schema({
    title:  String, // String is shorthand for {type: String}
    artist: String,
    album: String,
    genre: [{subgenre: String}]
    })

    module.exports = mongoose.model('song', songSchema );