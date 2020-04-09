var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var companiesSchema = new Schema({
    name: String,
    start_date: Date,
    coordinates: {
        type: {
            type: String, // Don't do `{ location: { type: String } }`
            enum: ['Point'], // 'location.type' must be 'Point'
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    }
});

module.exports = mongoose.model('companies', companiesSchema );