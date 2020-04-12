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

/**
 * HOLA ROB: AQUI TE DEJO LA ESTRUCTURA QUE IMAGINO PARA LA APP:
 * 
 * catalog/ : la pagina de inicio en donde se despliegan algunos albums
 * catalog/<objeto> : objeto siendo artista, cancion, disquera, o album
 * catalog/<objeto>/id :  igual que arriba, para obtener info de la song o lo que sea
 * catalog/<objeto>/create : pos ya sabes
 * catalog/<objeto>/id/delete: obvio no?
 * catalog/<objeto>/id/update : obvi wan
 * 
 * No funciona, pero ya me dio sueno asi que trate de avanzar lo mas que pude ahorita
 * Saque la info de aca (echale un ojo): 
 * https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/routes
 * 
 */


    //////////////////////////////ENDPOINTS/////////////////////////////


var indexRouter = require('./routes/index');
var catalogRouter = require('./routes/catalog');

app.use('/', indexRouter);
app.use('/catalog', catalogRouter);  // Add catalog routes to middleware chain.

//Pulling the models needed for the endpoints (all of them, basically)
let albumSchema = require('./models/albums');
let artistSchema = require('./models/artists');
let companiesSchema = require('./models/companies');
let songSchema = require('./models/songs');


const artistsCollection = mongoose.model('artist', artistSchema, 'artists');
const albumsCollection = mongoose.model('album', albumSchema, 'albums');
const companiesCollection = mongoose.model('company', companiesSchema, 'companies');
const songsCollection = mongoose.model('song', songSchema, 'songs');

//////////////////////////////////////ENDPOINTS//////////////////////////


////////////////// GET ////////////////

//Main Menu
// app.get('/', (req, res) => {
// 	res.send('Hello World');
// 	// si no haces el limit tarda un buen
// 	/*artistsCollection.find({}).limit(10).exec((err, data) => {
// 		if(err){
// 		console.log(err)
// 		}
// 		console.log(data)
// 	} )*/
// });


// //artists
// app.get('/catalog/artists', (req, res) => {
// 	artistsCollection
// 		.aggregate([
// 			{
// 				$sort: {
// 					name: 1
// 				}
// 			},
// 			{ $limit: 30 }
// 		])
// 		.exec((err, data) => {
// 			if (err) {
//                 console.log(err);
//                 res.status(404).send({error: 'No documents found'});
// 			}
// 			//console.log(data);
// 			res.send(data);
// 		});
// });


// // get a single artist
// app.get('/catalog/artists/:id', (req, res) => {
//     let id = parseInt(req.params.id);
//     artistsCollection.aggregate([
//         {
//             '$match': {
//                 '_id': id
//             }
//         }, {
//             '$project': {
//                 '_id': 0,
//                 'birth_date': 0,
//                 'start_date': 0
//             }
//         }
//     ]).exec((err, data) => {
//         if (err) {
//             console.log(err);
//             res.status(404).send({error:'No songs match your query'});
//         }
//         res.send(data);
//     });
// });

// //get all songs
// app.get('/catalog/songs', (req, res) => {
//     songsCollection.aggregate([
//         {
//             '$unwind': "id_artist"},

//     ])
//     .exec((err, data) => {
//         if (err) {
//             console.log(err);
//             res.status(404).send({error:'No documents found'});
//         }
//         res.send(data);
//     });
//     // song.find({name: "Pearl"}, function(err, result) {
// 	// 	if (err) return handleError(err);
// 	// 	else res.send(result);
// 	// });
// });

// //get specific song
// app.get('/catalog/songs/:id', (req, res) => {
//     let id = parseInt(req.params.id);
//     songsCollection.aggregate([
//         {
//             '$match': {
//                 '_id': id
//             }
//         }, {
//             '$project': {
//                 '_id': 0
//             }
//         }
//     ]).exec((err, data) => {
//         if (err) {
//             console.log(err);
//             res.status(404).send({error: 'No documents found'});
//         }
//         res.send(data);
//     });
// });

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));

// require module that you need to pull with
// let SomeModel = require('../models/somemodel')
