const artistSchema = require('../models/artists');
const songSchema = require('../models/songs');
const albumSchema = require('../models/albums');
const mongoose = require('mongoose');
const artistsCollection = mongoose.model('artist', artistSchema, 'artists');
const songsCollection = mongoose.model('song', songSchema, 'songs');
const albumsCollection = mongoose.model('album', albumSchema, 'albums');
const ObjectId = mongoose.Types.ObjectId;

// Display list of all Authors.
exports.artist_list = function(req, res) {
  page_no = req.params.page_no;
  artistsCollection
    .aggregate([
      {
        $skip: (page_no - 1) * 30
      },
      {
        $limit: 30
      },
      {
        $sort: {
          name: 1
        }
      },
      {
        $lookup: {
          from: 'albums',
          localField: '_id',
          foreignField: 'id_artist',
          as: 'albums'
        }
      }
    ])
    .exec((err, data) => {
      if (err) {
        console.log(err);
        res.status(404).send({ error: 'No artists found.' });
      }
      res.send(data);
    });
};

//Handle company create on POST.
exports.artist_create = function(req, res) {
  let new_name = req.body.name;
  let new_start_date = req.body.start_date;
  let new_birth_date = req.body.birth_date;
  let new_birth_country = req.body.birth_country;

  let newArtist = new artistsCollection({
    name: new_name,
    start_date: new_start_date,
    birth_date: new_birth_date,
    birth_country: new_birth_country
  });

  newArtist.save(function(err) {
    if (err) {
      console.log(err);
      res.status(400).send({ error: 'Unable to save artist into database' });
    }
    res.status(201).send('Artist added to database');
  });
};

// Display Artist delete form on DELETE.
exports.artist_delete = function(req, res) {
  let id = ObjectId(req.params.id);

  songsCollection.deleteMany({id_artist: id},(err, data) => {
    if (err) {
      //console.log(err);
      res.status(400).send({ error: 'Could not delete artist ahhh' });
    } else {
      //console.log(data);
      //songsCollection.deleteMany({artist_id: id})
      //albumsCollection.deleteMany({artist_id: id})
      res.status(200).send(data);   
    }
  });
  
  albumsCollection.deleteMany({id_artist: id}, (err, data)  => {
    if (err) {
      //console.log(err);
      res.status(400).send({ error: 'Could not delete artist ahhh' });
    } else {
      res.status(200).send(data);    
    }
  });
  
  artistsCollection.deleteOne({ _id: id }, (err, data) => {
    if (err) {
      //console.log(err);
      res.status(400).send({ error: 'Could not delete artist ahhh' });
    } else {
      res.status(200).send(data);
      //songsCollection.deleteMany({artist_id: id})
      //albumsCollection.deleteMany({artist_id: id})
    }
  });
};

// Display Artists that have that name
exports.artist_search = function(req, res) {
  let desired_name = req.params.string;

  artistsCollection
    .aggregate([
      {
        $match: {
          name: {
            $regex: '(?i)' + desired_name
          }
        }
      },
      {
        $limit: 20
      },
      {
        $lookup: {
          from: 'albums',
          localField: '_id',
          foreignField: 'id_artist',
          as: 'albums'
        }
      }
    ])
    .exec((err, data) => {
      if (err) {
        console.log(err);
        res.status(404).send({ error: 'Oops. No artist matches that name.' });
      }
      res.send(data);
    });
};

//exports.artist_update = function (req, res) {
//}
//Handle Artist update on POST.

exports.artist_update = function(req, res) {
  id = req.params.id;
  console.log('updating',id)
  
    const new_name = req.body.name;
    const new_start_date = req.body.start_date;
    const new_birth_date = req.body.birth_date;
    const new_birth_country = req.body.birth_country;

  
      artistsCollection.updateOne(
        {
          _id: ObjectId(id)
        },
        {
          $set: {
            name: new_name,
            start_date: new_start_date,
            birth_date: new_birth_date,
            birth_country: new_birth_country
          }
        }, function(err, data){
          if (err) {
            console.log(err);
            res.status(404).send({ error: 'Oops. No artist updated.' });
          }
          res.status(201).send('The artist updated correctly');
        }
      );
      
};

exports.artist_total = function (req, res) {
	artistsCollection.aggregate([
		{
			'$count': 'total'
		}
	]).exec((err, data) => {
		if (err) {
			console.log(err);
			res.status(404).send({ error: 'Oops. No artists could be counted.' })
		}
		res.send(data);

	});
};

      
