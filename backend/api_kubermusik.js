/*
API para conectar la base de datos al front end usando mongoose
*/

const express = require('express');
const mongoose = require('mongoose');

const dbLink = require('./config/keys').mongoURI;

const app = express();
app.use(express.json());

//conection + error handling
mongoose
	.connect(dbLink, {
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


    //////////////////////////////ENDPOINTS/////////////////////////////


const catalogRouter = require('./routes/catalog');
const bodyParser = require('body-parser');

app.use('/', catalogRouter);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
