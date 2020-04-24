const companySchema = require('../models/companies');
const albumsSchema = require('../models/albums');
const mongoose = require('mongoose');
const companiesCollection = mongoose.model('company', companySchema, 'companies');
const albumsCollection = mongoose.model('album', albumsSchema, 'albums');
const ObjectId = mongoose.Types.ObjectId;

// Display list of all Authors.
exports.companies_list = function (req, res) {
  page_no = req.params.page_no;
  companiesCollection.aggregate([
    {
      '$skip': 30 * (page_no - 1)
    }, {
      '$limit': 30
    }, {
      '$sort': {
        'name': 1
      }
    }
  ])
  .exec((err, data) => {
      if (err) {
          console.log(err);
          res.status(404).send({error:'No Companies found. Try adding companies.'});
      }
      res.send(data);
  });
};

// Display detail page for a specific record label company.
exports.companies_detail = function (req, res) {
  id = req.params.id;
  
  companiesCollection.aggregate([
    {
      '$match': {
        '_id': ObjectId(id)
      }
    }, {
      '$project': {
        '_id': 1,
        'name': 1,
        'start_date': 1,
        'coordinates': 1
      }
    }
  ])
  .exec((err, data) => {
      if (err) {
          console.log(err);
          res.status(404).send({error:'No Companies found. Try adding companies.'});
      }
      res.send(data);
  });
};

//Handle company create on GET.
exports.companies_create = function (req, res) {
  let new_name = req.body.name
  let new_start_date = req.body.start_date
  let new_lat = parseFloat(req.body.lat)
  let new_long = parseFloat(req.body.long)

  const newCompany = new companiesCollection({"name": new_name, "start_date": new_start_date, "coordinates": {"type" : "Point", "coordinates":[new_long, new_lat]}});

  newCompany.save(function (err) {
    if (err) {
      console.log(err);
      res.status(400).send({error:'Unable to save company into database'})
    }
      res.status(201).send('Company added to database');
  });
};

// Display Company delete form on GET.
exports.companies_delete = function (req, res) {
  let id = req.params.id;
  
  companiesCollection.deleteOne({'_id' : ObjectId(id)}, (err, data) =>{
    if (err) {
      console.log(err);
      res.status(400).send({error: 'Could not delete company ahhh'});
    }else {
      res.status(200).send(data);
    }
  });
};

// Display Company update form on post.
exports.companies_update = function (req, res) {
  id = req.params.id;

  let new_name = req.body.name
  let new_start_date = req.body.start_date
  let new_long = req.body.long
  let new_lat = req.body.lat

  companiesCollection.updateOne(
		  {
			  _id: ObjectId(id)
		  },
		  {
			  $set: {
				  name: new_name,
				  start_date: new_start_date,
				  coordinates: {
					  "type": "Point",
					  "coordinates": [new_long, new_lat]
				  }
			  }
		  }, function(err, data){
    if (err) {
      console.log(err);
      res.status(400).send({error: 'Could not update company'});
    }else {
      res.status(200).send(data);
    }
  });
};

exports.companies_search = function (req,res) {
  let desired_name = req.params.string;

  companiesCollection.aggregate([
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
        res.status(404).send({ error: 'Oops. No company matches that name.' })
      }
      res.send(data);
    });
    // .explain((err, data) => {
      //   if (err) {
      //     console.log(err);
      //     res.status(404).send({ error: 'no companies' });
      //   } else res.status(200).send(data);
      // });
};


exports.companies_geo = function (req, res) {

  const long = req.body.long;
  const lat = req.body.lat;
  const kms = req.body.kms * 1000;

  companiesCollection.aggregate([
    {
      '$geoNear': {
        'near': {
          'type': 'Point', 
          'coordinates': [
            long, lat
          ]
        }, 
        'distanceField': 'dist.calculated', 
        'maxDistance': kms, 
        'includeLocs': 'dist.location', 
        'spherical': true
      }
    }, {
      '$project': {
        '_id': 1, 
        'name': 1, 
        'start_date': 1, 
        'coordinates': 1, 
        'distance': '$dist.calculated'
      }
    }, {
      '$sort': {
        'name': 1
      }
    }
  ])
      .exec((err, data) => {
          if (err) {
              console.log(err);
			  res.status(404).send({ error: 'Oops. No companies found in the area' })
		  }
          res.send(data);
      });
      // .explain((err, data) => {
      //   if (err) {
      //     console.log(err);
      //     res.status(404).send({ error: 'no companies' });
      //   } else res.status(200).send(data);
      // });
};


exports.companies_total_signs = function (req, res) {
	albumsCollection.aggregate([
		{
			'$count': 'total'
		}
	]).exec((err, data) => {
		if (err) {
			console.log(err);
			res.status(404).send({ error: 'Oops. No company matches that name.' })
		}
		res.send(data);
		
	});
};
