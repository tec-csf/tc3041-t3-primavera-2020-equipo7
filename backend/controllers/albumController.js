const albumSchema = require('../models/albums');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const albumsCollection = mongoose.model('album', albumSchema, 'albums');

exports.index = function (req, res) {
    res.send('NOT IMPLEMENTED: Site Home Page');
};

// Display list of all Authors.
exports.album_list = function (req, res) {
    res.send('NOT IMPLEMENTED: Albums');
};

exports.album_create = function (req, res) {
    res.send('NOT IMPLEMENTED: Album create');
};

// Display Album delete form on GET.
exports.album_delete = function (req, res) {
    res.send('NOT IMPLEMENTED: Album delete');
};

// Display Album update form on GET.
exports.album_update = function (req, res) {
    res.send('NOT IMPLEMENTED: Album update');
};

// Display detail page for a specific book.
exports.album_detail = function (req, res) {
    res.send('NOT IMPLEMENTED: Book detail: ' + req.params.id);
};