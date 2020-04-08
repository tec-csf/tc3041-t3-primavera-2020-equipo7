var mongoose = require('mongoose')
var Schema = mongoose.Schema

var artistSchema = new Schema({
    name: String,
    birthdate: Date,
    startdate: Date,
    nationality: String
})

module.exports = mongoose.model('artist', artistSchema)