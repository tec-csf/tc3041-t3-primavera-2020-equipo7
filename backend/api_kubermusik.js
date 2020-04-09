/*
API para conectar la base de datos al front end usando mongoose
*/

const express = require('express');
const app = express();

app.use(express.json());

var mongoose = require('mongoose');

//conection + error handling
const mongodb = 'mongodb+srv://Test:uhPoUIbK2lpNVHRm@cluster0-vnehv.gcp.mongodb.net/test?retryWrites=true&w=majority'; //miss
mongoose.connect(mongodb, {
    useUnifiedTopology: true, useNewUrlParser: true
})
.then(() => console.log('Connected to the DB!'))
.catch(err => {console.log(`DB connection Error: ${err.message}`);
});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));


//////////////////////////////ENDPOINTS/////////////////////////////

//Pulling the models needed for the endpoints (all of them, basically)

//NOTA: NO HE ENCONTRADO LA MANERA DE SEGMENTAR EL CODIGO.
// var albums = require('./models/albums');
// var artists = require('./models/artists');
// var companies = require('./models/companies');
// var songs = require('./models/songs');

///////////////////////////// SCHEMAS ///////////////////////////
var Schema = mongoose.Schema;
var albumSchema = new Schema({
    name: String,
    launch_date: Date,
    id_company: Int32Array,
    id_artist: Int32Array
});

var artistSchema = new Schema({
    name: String,
    start_date: Date,
    birth_date: Date,
    birth_country: String
});

var companiesSchema = new Schema({
    name: String,
    start_date: Date,
    coordinates: {
        type: {
            type: String, // Don't do `{ location: { type: String } }`
            enum: ['Point'], // 'location.type' must be 'Point'
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    }
});
var songSchema = new Schema({
    name: String,
    duration: Int32Array,
    genres: [String],
    id_artist: Int32Array,
    id_album: Int32Array,
});

mongoose.model("artist", artistSchema, 'artists');
mongoose.model("album", albumSchema, 'albums');
mongoose.model("company", companiesSchema, 'companies');
mongoose.model("song", songSchema, 'songs');



//////////////////////////////////////ENDPOINTS//////////////////////////

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.get('/api/artists', (req, res) => {
    db.artists.aggregate([
        {
            '$match': {}
        }, {
            '$sort': {
                'name': 1
            }
        }, {
            '$limit': 30
        }
    ]);
});

app.get('/api/artists/:id', (req,res) => {
    res.send(req.params);
});

// app.get('/api/artists/:id', (req, res) => {
//     res.send(req.params);
// });

app.get('/api/songs/', (req, res) =>{
    var song = mongoose.model("song", songSchema, 'songs');
    song.find({name:'Pearl'}, 'name', function (err, result) {
        if (err) return handleError(err);
        else res.send(result);
        // Prints "Space Ghost is a talk show host".
        // console.log('%s %s is a %s.', person.name.first, person.name.last,
        //     person.occupation);
    });
});



// app.get('/api/songs/', (req,res) =>{
//     db.songs.find({name: 'Forever Carousel'}, 'name', function (err, result) {
//         if (err) return handleError(err); 
//         else res.send(result);
//     })
// });

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));

// require module that you need to pull with
// var SomeModel = require('../models/somemodel')