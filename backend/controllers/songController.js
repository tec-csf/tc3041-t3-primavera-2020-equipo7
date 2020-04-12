var Song = require('../models/songs');

// Display list of all Authors.
exports.song_list = function (req, res) {
    res.send('NOT IMPLEMENTED: Songs list');
};

// Display detail page for a specific book.
exports.song_detail = function (req, res) {
    res.send('NOT IMPLEMENTED: Book detail: ' + req.params.id);
};

// Display song create form on GET.
exports.song_create_get = function (req, res) {
    res.send('NOT IMPLEMENTED: Book create GET');
};

// Handle Song create on POST.
exports.song_create_post = function (req, res) {
    res.send('NOT IMPLEMENTED: Song create POST');
};

// Display Song delete form on GET.
exports.song_delete_get = function (req, res) {
    res.send('NOT IMPLEMENTED: Song delete GET');
};

// Handle Song delete on POST.
exports.song_delete_post = function (req, res) {
    res.send('NOT IMPLEMENTED: Song delete POST');
};

// Display Song update form on GET.
exports.song_update_get = function (req, res) {
    res.send('NOT IMPLEMENTED: Song update GET');
};

// Handle Song update on POST.
exports.song_update_post = function (req, res) {
    res.send('NOT IMPLEMENTED: Song update POST');
};