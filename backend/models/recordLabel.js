var mongoose = require('mongoose')
var Schema = mongoose.Schema

var recordLabelSchema = new Schema({
    company: String,
    coodinates: {type: Point},
    startdate: Date
})

module.exports = mongoose.model('album', SomeModelSchema );