const companySchema = require('../models/companies');
const mongoose = require('mongoose');
const companiesCollection = mongoose.model('company', companySchema, 'companies');
const ObjectId = mongoose.Types.ObjectId;

// Display list of all Authors.
exports.companies_list = function (req, res) {
  page_no = req.params.page_no;
  companiesCollection.aggregate([
    {
      '$project': {
        '_id': 1,
        'name': 1,
        'start_date': 1,
        'coordinates': 1
        // 'latitute': {
        //   '$arrayElemAt': [
        //     '$coordinates', 0
        //   ]
        // },
        // 'longitude': {
        //   '$arrayElemAt': [
        //     '$coordinates', 1
        //   ]
        // }
      }
    }, {
      '$skip': 30 * (page_no - 1)
    }, {
      '$limit': 30
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

  const newCompany = new companiesCollection({"name": new_name, "start_date": new_start_date, "coordinates": {"type" : "Point", "coordinates":[new_lat, new_long]}});

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

// Display Company update form on GET.
exports.companies_update = function (req, res) {
  id = req.params.id;

  let new_name = req.body.name
  let new_start_date = req.body.start_date
  let new_lat = parseFloat(req.body.lat)
  let new_long = parseFloat(req.body.long)

  let filter = {'_id' : ObjectId(id)}
  let update = {
    "name": new_name,
    "start_date": new_start_date,
    "coordinates": {
      "type" : "Point",
      "coordinates":[new_lat, new_long]
    }
  }

  companiesCollection.findOneAndUpdate(filter, update, function(err, data){
    if (err) {
      console.log(err);
      res.status(400).send({error: 'Could not delete company ahhh'});
    }else {
      res.status(200).send();
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
};
