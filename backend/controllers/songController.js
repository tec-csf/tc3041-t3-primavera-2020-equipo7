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
    // let newSong = new songSchema(req, bodyParser);

    let Song = mongoose.model('Song', songSchema);
    const id = req.body._id;
    const name = req.body.name;
    const duration = req.body.duration;
    const genres = req.body.genres;
    const artist = req.body.artist;
    const album = req.body.album;

    let newSong = new Song({id, name, duration, genres, artist, album});
    newSong.save(function (err) {
        if (err) res.status(400).send({error: 'Unable to create song and add it to database'});
        res.status(201).send('Song successfully added to database');
    });
    // .then(item => {
    //     res.status(201).send('Song added to database');
    // })
    // .catch(err => {
    //     res.status(400).send({error:'Unable to save song into database'})
    // });
    // res.send('NOT IMPLEMENTED: Song create POST');
};

exports.song_delete = function (req, res) {
    let id_song = parseInt(req.params.id);
    console.log('type of id song '+ typeof id_song);
    songsCollection.find({'_id' : id_song}, (err, data) =>{
        if (err) {
            console.log(err);
            res.status(400).send({error: 'Could not delete song ahhh'});
        }else {
            res.status(200).send(data);
        }
    });
    // NOTA: no funciona ninguno de los dos por que nuestros _id son numeros, y deberian ser ObjectId (los de mongo) => lanza un castError
    // songsCollection.deleteOne( { _id : id_song }, (err, data) => {
    //     if (err){
    //         console.log(err);
    //         res.status(400).send({error:'Could not delete song.'});
    //     }else{
    //         res.status(200).send(data);
    //     }
    // });
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
                '_id': parseInt(req.params.id)
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