let songSchema = require('../models/songs');
mongoose = require('mongoose');
const songsCollection = mongoose.model('song', songSchema, 'songs');

// var Song = require('../models/songs');

// Display list of all songs.
exports.song_list = function (req, res) {
    //Obtaining a list of songs (30 at a time for each page) using skip
    //the file is accessed through the following route:
    // localhost:PORT/catalog/songs/<page_no>
    page_no = req.params.page_no;
    songsCollection.aggregate([
        {
            '$unwind': {
                'path': '$id_artist'
            }
        }, {
            '$sort': {
                'name': 1
            }
        }, {
            '$project': {
                '_id': 0
            }
        }, {
            '$skip': page_no*30
        }, {
            '$limit': 30
        }
    ])
    .exec((err, data) => {
        if (err) {
            console.log(err);
            res.status(404).send({error:'No Songs found. Try adding music.'});
        }
        res.send(data);
    });
    // res.send('NOT IMPLEMENTED: Songs list');
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