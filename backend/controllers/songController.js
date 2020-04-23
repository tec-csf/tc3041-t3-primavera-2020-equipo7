const songSchema = require('../models/songs');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const songsCollection = mongoose.model('song', songSchema, 'songs');

// Display list of all songs.
exports.song_list = function (req, res) {
    //Obtaining a list of songs (30 at a time for each page) using skip
    //the file is accessed through the following route:
    // localhost:PORT/catalog/songs/<page_no>
    page_no = req.params.page_no;
    songsCollection.aggregate([
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
                'from': 'albums',
                'localField': 'id_album',
                'foreignField': '_id',
                'as': 'album'
            }
        }, {
            '$unwind' : {
                'path' : '$album'
            }
        }, {
            '$unwind' : {
                'path' : '$artist'
            }
        }, {
            '$project' : {
                'id_artist' : 0,
                'id_album' : 0
            }
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

// Display detail page for a specific song.
exports.song_detail = function (req, res) {
    id_song = req.params.id;
    songsCollection.aggregate([
        {
            '$match': {
                '_id': parseInt(id_song)
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
                'from': 'albums',
                'localField': 'id_album',
                'foreignField': '_id',
                'as': 'album'
            }
        }, {
            '$unwind' : {
                'path' : '$album'
            }
        }, {
            '$unwind' : {
                'path' : '$artist'
            }
        }
    ])
    .exec((err, data) => {
        if (err){
            console.log(err);
            res.status(404).send({error:'Oops. No song matches that ID.'})
        }
        res.send(data);
    });
};

// Handle Song create on POST.
exports.song_create = function (req, res) {
    const new_name = req.body.name;
    const new_duration = req.body.duration;
    const new_genres = req.body.genres;
    const new_next_song = ObjectId(req.body.next_song);
    const new_artist = ObjectId(req.body.artist);
    const new_album = ObjectId(req.body.album);

    const newSong = new songsCollection({"name": new_name, "duration": new_duration, "genres": new_genres, "next_song": new_next_song, "id_artist": new_artist, "id_album": new_album});
    newSong.save(function (err) {
        if (err) res.status(400).send({error: 'Unable to create song and add it to database'});
        res.status(201).send('Song successfully added to database');
    });
};

exports.song_delete = function (req, res) {
    const id_song = ObjectId(req.params.id);

    songsCollection.deleteOne({_id: id_song}, (err) => {
        if (err) {
            console.log(err);
            res.status(400).send({ error: 'Could not delete song ahhh' });
        } else {
            res.status(200).send("Song deleted successfully");
        }
    });
};

// Handle Song update on POST.
exports.song_update = function (req, res) {
    const new_name = req.body.name;
    const new_duration = req.body.duration;
    const new_genres = req.body.genres;
    const new_next_song = ObjectId(req.body.next_song);
    const new_artist = ObjectId(req.body.id_artist);
    const new_album = ObjectId(req.body.id_album);
    
    id = ObjectId(req.params.id);
    songsCollection.updateOne({ _id: id },
        {
            $set:
            {
                name: new_name,
                duration: new_duration,
                genres: new_genres,
                next_song: new_next_song,
                id_artist: new_artist,
                id_album: new_album
            }
        }, (err) => {
            if (err) {
                console.log(err);
                res.status(400).send({ error: 'Could not update song ahhh' });
            } else {
                res.status(200).send("Song updated successfully");
            }
        });
};

exports.song_search = function(req,res) {
    let desired_name = req.params.string;

    songsCollection.aggregate([
        {
            '$match': {
                'name': {
                    '$regex': '(?i)' + desired_name
                }
            }
        }, {
            '$limit': 20
        }, {
          '$lookup': {
              'from': 'artists',
              'localField': 'id_artist',
              'foreignField': '_id',
              'as': 'artist'
          }
      }, {
          '$lookup': {
              'from': 'albums',
              'localField': 'id_album',
              'foreignField': '_id',
              'as': 'album'
          }
      }, {
          '$unwind' : {
              'path' : '$album'
          }
      }, {
          '$unwind' : {
              'path' : '$artist'
          }
      }, {
          '$project' : {
              'id_artist' : 0,
              'id_album' : 0
          }
      }
    ])
    .exec((err, data) => {
        if (err) {
            console.log(err);
            res.status(404).send({ error: 'Oops. No song matches that name.' })
        }
        res.send(data);
    });
};

exports.song_cats = function (req, res) {
    //en cada pagina da una cuenta de los generos que hay
    let page_no = parseInt(req.params.page_no);
    songsCollection.aggregate([
        {
            '$skip': 30 * (page_no - 1)

        }, {
            '$limit': 30
        }, {
            '$facet': {
                'CategorizeByGenre': [
                    {
                        '$unwind': '$genres'
                    }, {
                        '$sortByCount': '$genres'
                    }
                ],
            }
        }
    ])
        .exec((err, data) => {
            if (err) {
                console.log(err);
                res.status(404).send({ error: 'Oops. No song categories found.' })
            }
            res.send(data);
        });  
};

exports.song_total = function (req, res) {
    //lo regresa con el total
    songsCollection.aggregate([
        {
            '$count': 'total'
        }
    ])
    .exec((err, data) => {
        if (err) {
            console.log(err);
            res.status(404).send({ error: 'Oops. No songs found.' })
        }
        res.send(data);
    });  
};
