const songSchema = require('../models/songs');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
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

// Display detail page for a specific book.
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
    let newSong = new songSchema(req, bodyParser);
    newSong.save()
    .then(item => {
        res.status(201).send('Song added to database');
    })
    .catch(err => {
        res.status(400).send({error:'Unable to save song into database'})
    });
    // res.send('NOT IMPLEMENTED: Song create POST');
};

exports.song_delete = function (req, res) {
    songsCollection.deleteOne({'_id': req.params.id}, (err, data) =>{
        if (err){
            console.log(err);
            res.status(400).send({error:'Could not delete song.'});
        }
        res.status(200).send('Todo gud')
    });
};

// Handle Song update on POST.
exports.song_update = function (req, res) {
    id = req.params.id;
    songsCollection.findById(id, function(err, data){
    let name = req.body.name;
    let duration = req.body.duration;
    let genres = req.body.genres;
    let artist = req.body.artist;
    let album = req.body.album;

    
    if (!data){
        console.log('No song found to be updated.');
    }
    else{
        songsCollection.update(
            {
                '_id': req.params.id
            },
            {
                "$set":
                {
                    "name": name,
                    "duration": duration,
                    "genres": genres,
                    "id_artist": artist,
                    "id_album": album
                }
            }
        );
        res.status(201).send('Todo gud');
    }
    });
};