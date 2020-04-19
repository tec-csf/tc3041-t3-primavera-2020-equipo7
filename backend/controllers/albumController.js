const albumSchema = require('../models/albums');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const albumsCollection = mongoose.model('album', albumSchema, 'albums');

exports.index = function (req, res) {
    
    res.send('NOT IMPLEMENTED: Site Home Page');
};

// Display list of all Authors.
exports.album_list = function (req, res) {
    page_no = req.params.page_no;
    albumsCollection.aggregate([
        {
            '$skip': 30 * (page_no - 1)
        }, {
            '$limit': 30
        }, {
            '$sort': {
                'name': 1
            }
        }, {
            '$lookup': {
                'from': 'artists',
                'localField': 'id_artist',
                'foreignField': '_id',
                'as': 'artist'
            }
        }, {
            '$lookup': {
                'from': 'companies',
                'localField': 'id_company',
                'foreignField': '_id',
                'as': 'company'
            }
        }, {
            '$unwind': {
                'path': '$artist'
            }
        }, {
            '$unwind': {
                'path': '$company'
            }
        }, {
            '$project': {
                'id_company': 0,
                'id_artist': 0
            }
        }
    ])
        .exec((err, data) => {
            if (err) {
                console.log(err);
                res.status(404).send({ error: 'No albums found. Try adding music.' });
            }
            res.send(data);
        });
    // res.send('NOT IMPLEMENTED: Albums');
};

exports.album_create = function (req, res) {
    let newAlbum = new albumSchema(req, bodyParser);
    newAlbum.save()
        .then(item => {
            res.status(201).send('Album added to database');
        })
        .catch(err => {
            res.status(400).send({ error: 'Unable to save album into database' })
        });
    // res.send('NOT IMPLEMENTED: Album create');
};

// Display Album delete form on GET.
exports.album_delete = function (req, res) {
    albumsCollection.deleteOne({ '_id': parseInt(req.params.id) }, (err, data) => {
        if (err) {
            console.log(err);
            res.status(400).send({ error: 'Album could not be deleted. Dependencies might still be active.' });
        }
        res.status(200).send('album deleted sucessfully')
    });
    // res.send('NOT IMPLEMENTED: Album delete');
};

// Display Album update form on GET.
exports.album_update = function (req, res) {
    id = req.params.id;
    albumsCollection.findById(id, function (err, data) {
        let name = req.body.name;
        let launch_date = req.body.launch_date;
        let id_company = req.body.id_company;
        let id_artist = req.body.artist;


        if (!data) {
            res.status(404).send({error:'No album found'})
            console.log('No album found to be updated.');
        }
        else {
            songsCollection.update(
                {
                    '_id': req.params.id
                },
                {
                    "$set":
                    {
                        "name": name,
                        "launch_date": launch_date,
                        "id_company": id_company,
                        "id_artist": id_artist
                    }
                }
            );
            res.status(201).send('Updated album successfully');
        }
    });
    // res.send('NOT IMPLEMENTED: Album update');
};

// Display detail page for a specific book.
exports.album_detail = function (req, res) {
    id_album = req.params.id;
    albumsCollection.aggregate([
        {
            '$match': {
                '_id': parseInt(id_album)
            }
        }, {
            '$lookup': {
                'from': 'artists',
                'localField': 'id_artist',
                'foreignField': '_id',
                'as': 'artist'
            }
        }, {
            '$lookup': {
                'from': 'companies',
                'localField': 'id_company',
                'foreignField': '_id',
                'as': 'record_label'
            }
        }, {
            '$project': {
                'id_company': 0,
                'id_artist': 0
            }
        }, {
            '$unwind': {
                'path': '$artist'
            }
        }, {
            '$unwind': {
                'path': '$record_label'
            }
        }
    ])
    .exec((err, data) => {
        if (err) {
            console.log(err);
            res.status(404).send({ error: 'Oops. No song matches that ID.' })
        }
        res.send(data);
    });
    // res.send('NOT IMPLEMENTED: Book detail: ' + req.params.id);
};

exports.album_search = function (req, res) {
    let desired_name = req.params.string;

    albumsCollection.aggregate([
        {
            '$match': {
                'name': {
                    '$regex': '(?i)' + desired_name
                }
            }
        }, {
            '$limit': 20
        }
    ])
        .exec((err, data) => {
            if (err) {
                console.log(err);
                res.status(404).send({ error: 'Oops. No album matches that name.' })
            }
            res.send(data);
        });
    // res.send('album search by name not implemented')
}