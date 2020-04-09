/*
API para conectar la base de datos al front end usando mongoose
*/

const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

//conection + error handling
const mongodb = 'mongodb+srv://Test:uhPoUIbK2lpNVHRm@cluster0-vnehv.gcp.mongodb.net/Tarea3BDAvanzadas'; //miss
mongoose
	.connect(mongodb, {
		useUnifiedTopology: true,
		useNewUrlParser: true
	})
	.then(() => {
		console.log('Connected to the DB!');
		//check collections
		//console.log(Object.keys(mongoose.connection.collections));
	})
	.catch((err) => {
		console.log(`DB connection Error: ${err.message}`);
	});

//const db = mongoose.connection;
//db.on('error', console.error.bind(console, 'connection error:'));

//////////////////////////////ENDPOINTS/////////////////////////////

//Pulling the models needed for the endpoints (all of them, basically)

//NOTA: NO HE ENCONTRADO LA MANERA DE SEGMENTAR EL CODIGO.
// let albums = require('./models/albums');
// let artists = require('./models/artists');
// let companies = require('./models/companies');
// let songs = require('./models/songs');

///////////////////////////// SCHEMAS ///////////////////////////
let Schema = mongoose.Schema;
let albumSchema = new Schema({
	name: String,
	launch_date: Date,
	id_company: Number,
	id_artist: Number
});

let artistSchema = new Schema({
	name: String,
	start_date: Date,
	birth_date: Date,
	birth_country: String
});

let companiesSchema = new Schema({
	name: String,
	start_date: Date,
	coordinates: {
		type: {
			type: String, // Don't do `{ location: { type: String } }`
			enum: [ 'Point' ], // 'location.type' must be 'Point'
			required: true
		},
		coordinates: {
			type: [ Number ],
			required: true
		}
	}
});
let songSchema = new Schema({
	name: String,
	duration: Number,
	genres: [ String ],
	id_artist: Number,
	id_album: Number
});

const artistsCollection = mongoose.model('artist', artistSchema, 'artists');
mongoose.model('album', albumSchema, 'albums');
mongoose.model('company', companiesSchema, 'companies');
mongoose.model('song', songSchema, 'songs');

//////////////////////////////////////ENDPOINTS//////////////////////////

app.get('/', (req, res) => {
	res.send('Hello World');
	// si no haces el limit tarda un buen
	/*artistsCollection.find({}).limit(10).exec((err, data) => {
		if(err){
		console.log(err)
		}
		console.log(data)
	} )*/
});

app.get('/api/artists', (req, res) => {
	artistsCollection
		.aggregate([
			{
				$sort: {
					name: 1
				}
			},
			{ $limit: 30 }
		])
		.exec((err, data) => {
			if (err) {
				console.log(err);
			}
			//console.log(data);
			res.send(data)
		});
});

app.get('/api/artists/:id', (req, res) => {
	res.send(req.params);
});

// app.get('/api/artists/:id', (req, res) => {
//     res.send(req.params);
// });

app.get('/api/songs/', (req, res) => {
	let song = mongoose.model('song', songSchema, 'songs');
	song.find({ name: 'Pearl' }, 'name', function(err, result) {
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
// let SomeModel = require('../models/somemodel')
