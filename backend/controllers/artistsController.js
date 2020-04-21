const artistSchema = require('../models/artists');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const artistsCollection = mongoose.model('artist', artistSchema, 'artists');
const ObjectId = mongoose.Types.ObjectId;

// Display list of all Authors.
exports.artist_list = function (req, res) {
    
    page_no = req.params.page_no;
    artistsCollection.aggregate([
        {
          '$project': {
            '_id': 1, 
            'name': 1, 
            'start_date': 1,
            'birth_date': 1,
            'birth_country': 1
          }
        }, {
          '$skip': (page_no - 1)*30
        }, {
          '$limit': 30
        }
      ])
    .exec((err, data) => {
        if (err) {
            console.log(err);
            res.status(404).send({error:'No artists found.'});
        }
        res.send(data);
    });
};

//Handle company create on POST.
exports.artist_create = function (req, res) {
  let new_name = req.body.name
  let new_start_date = req.body.start_date
  let new_birth_date = req.body.birth_date
  let new_birth_country = req.body.birth_country

  let newArtist = new artistsCollection({"name": new_name, "start_date": new_start_date, "birth_date": new_birth_date, "birth_country": new_birth_country});

  newArtist.save(function (err) {
    if (err) {
      console.log(err);
      res.status(400).send({error:'Unable to save artist into database'})
    }
      res.status(201).send('Artist added to database');
  });
};

// Display Artist delete form on DELETE.
exports.artist_delete = function (req, res) {
  let id = req.params.id;

  artistsCollection.deleteOne({'_id' : ObjectId(id)}, (err, data) =>{
    if (err) {
      console.log(err);
      res.status(400).send({error: 'Could not delete artist ahhh'});
    }else {
      res.status(200).send(data);
    }
  });
};

// Display detail page for a specific artist.
exports.artist_detail = function (req, res) {
  id = req.params.id;
  artistsCollection.aggregate(
    [
      {
        '$match': {
          '_id': ObjectId(id)
        }
      }, {
        '$lookup': {
          'from': 'albums', 
          'localField': '_id', 
          'foreignField': 'id_artist', 
          'as': 'Albums'
        }
      }, {
        '$project':{
          '_id': 1, 
            'name': 1, 
            'start_date': 1,
            'birth:date': 1,
            'birth_country': 1,
            'Albums': 1
        }
      }
    ]
  )
  .exec((err, data) => {
    if (err){
        console.log(err);
        res.status(404).send({error:'Oops. No artist matches that ID.'})
    }
    res.send(data);
  });
};

exports.artist_update = function (req, res) {
}
// Handle Artist update on POST.
// exports.artist_update = function (req, res) {
//   id = req.params.id;
//   artistsCollection.findById(id, function(err, data){
//   let new_name = req.body.name
//   let new_start_date = req.body.start_date
//   let new_birth_date = req.body.birth_date
//   let new_birth_country = req.body.birth_country
  
//   if (!data){
//     console.log('No artist found to be updated.');
// }
// else{
//     songsCollection.update(
//         {
//             '_id': ObjectId(id)
//         },
//         {
//             "$set":
//             {
//                 "name": new_name,
//                 "start_date": new_start_date,
//                 "birth_date": new_birth_date,
//                 "birth_country": new_birth_country
//             }
//         }
//     );
//     res.status(201).send('The artist updated correctly');
// }
// });
// };
