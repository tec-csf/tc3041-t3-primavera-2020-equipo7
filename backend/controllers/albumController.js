const albumSchema = require('../models/albums');
const songSchema = require('../models/songs');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const albumsCollection = mongoose.model('album', albumSchema, 'albums');
const songsCollection = mongoose.model('song', songSchema, 'songs');

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
    const new_name = req.body.name;
    const new_launch_date = req.body.launch_date;
    const new_id_company = ObjectId(req.body.id_company);
    const new_id_artist = ObjectId(req.body.id_artist);

    const newAlbum = new albumsCollection({ "name": new_name, "launch_date": new_launch_date, "id_company": new_id_company, "id_artist": new_id_artist });
    
    newAlbum.save(function (err) {
        if (err) {
            console.log(err);
            res.status(400).send({ error: 'Unable to save new album into database' })
        }
        res.status(201).send('Album added successfully to database');
    });
    // res.send('NOT IMPLEMENTED: Album create');
};

// Display Album delete form on GET.
exports.album_delete = function (req, res) {
    let id = ObjectId(req.params.id);

    songsCollection.deleteMany({id_album: id}, (err, data)  => {
        if (err) {
          //console.log(err);
          res.status(400).send({ error: 'Could not delete album ahhh' });
        } else {
          res.status(200).send(data);    
        }
      });

    albumsCollection.deleteOne({ '_id': id }, (err) => {
        if (err) {
            console.log(err);
            res.status(400).send({ error: 'Album could not be deleted. Dependencies might still be active.' });
        }
        res.status(200).send('album deleted sucessfully')
    });
    // res.send('NOT IMPLEMENTED: Album delete');
};

// Display Album update form on post.
exports.album_update = function (req, res) {
    id = req.params.id;

    const new_name = req.body.name;
    const new_launch_date = req.body.launch_date;
    const new_id_company = ObjectId(req.body.id_company);
    const new_id_artist = ObjectId(req.body.id_artist);

    albumsCollection.updateOne(
        {
            _id : ObjectId(id)
        }, {
            $set: {
                name: new_name,
                launch_date: new_launch_date,
                id_company: new_id_company,
                id_artist: new_id_artist
            }
        }, function(err){
            if (err) {
              res.status(404).send({ error: 'Oops. No album updated.' });
            }
            
            res.status(201).send('album updated successfully');
        }
    );   
};

// Display detail page for a specific book.
exports.album_detail = function (req, res) {
    id_album = req.params.id;

    songsCollection.aggregate(
        [
            {
                '$match': {
                    'id_album': ObjectId(id_album)
                }
            }, {
                '$graphLookup': {
                    'from': 'songs',
                    'startWith': '$next_song',
                    'connectFromField': 'next_song',
                    'connectToField': '_id',
                    'as': 'in_queue',
                    'maxDepth': 5
                }
            }
        ]
    ).exec((err, data) => {
        if (err) {
            console.log(err);
            res.status(404).send({ error: 'Oops. No song matches that ID.' })
        }
        res.status(200).send(data);
        
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
        },{
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
      },
      {
        '$sort': {
          'name': -1
        }
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

exports.album_total = function(req, res) {
    albumsCollection.aggregate([
        {
            '$count': 'total'
        }
    ])
        .exec((err, data) => {
            if (err) {
                console.log(err);
                res.status(404).send({ error: 'Oops. No albums found.' })
            }
            res.send(data);
        });
};
