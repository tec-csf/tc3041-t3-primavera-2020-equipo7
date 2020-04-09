var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var artistSchema = new Schema({
    name: String,
    start_date: Date,
    birth_date: Date,
    birth_country: String
});

module.exports = mongoose.model('artists', artistSchema);