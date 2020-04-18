const artistSchema = require('../models/songs');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const artistsCollection = mongoose.model('artist', artistSchema, 'artists');

// Display list of all Authors.
exports.artist_list = function (req, res) {
    res.send('NOT IMPLEMENTED: Companies');
};

// Handle Artist create on POST.
exports.artist_create = function (req, res) {
    res.send('NOT IMPLEMENTED: Artist create');
};

// Display Artist delete form on DELETE.
exports.artist_delete = function (req, res) {
    res.send('NOT IMPLEMENTED: Artist delete');
};

// Display detail page for a specific artist.
exports.artist_detail = function (req, res) {
    res.send('NOT IMPLEMENTED: Book detail: ' + req.params.id);
};

// Handle Artist update on POST.
exports.artist_update = function (req, res) {
    res.send('NOT IMPLEMENTED: Artist update');
};