var mongoose = require('mongoose')
var Schema = mongoose.Schema

var albumSchema = new Schema({
    name: String,
    releasedate: Date,
    recordlabel: String
})

module.exports = mongoose.model('album', albumSchema )