var Album = require('../models/albums');

exports.index = function (req, res) {
    res.send('NOT IMPLEMENTED: Site Home Page');
};

// Display list of all Authors.
exports.album_list = function (req, res) {
    res.send('NOT IMPLEMENTED: Albums');
};

// Handle Album create on POST.
exports.album_create_post = function (req, res) {
    res.send('NOT IMPLEMENTED: Album create POST');
};

exports.album_create_get = function (req, res) {
    res.send('NOT IMPLEMENTED: Album create POST');
};

// Display Album delete form on GET.
exports.album_delete_get = function (req, res) {
    res.send('NOT IMPLEMENTED: Album delete GET');
};

// Handle Album delete on POST.
exports.album_delete_post = function (req, res) {
    res.send('NOT IMPLEMENTED: Album delete POST');
};

// Display Album update form on GET.
exports.album_update_get = function (req, res) {
    res.send('NOT IMPLEMENTED: Album update GET');
};

// Display detail page for a specific book.
exports.album_detail = function (req, res) {
    res.send('NOT IMPLEMENTED: Book detail: ' + req.params.id);
};

// Handle Album update on POST.
exports.album_update_post = function (req, res) {
    res.send('NOT IMPLEMENTED: Album update POST');
};