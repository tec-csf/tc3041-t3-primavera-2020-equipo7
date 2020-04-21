var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var albumSchema = new Schema({
    name: String,
    launch_date: String,
    id_company: Schema.Types.ObjectId,
    id_artist: Schema.Types.ObjectId
});

module.exports = albumSchema;
// module.exports = mongoose.model('albums', albumSchema );