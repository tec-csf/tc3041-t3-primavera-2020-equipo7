const companySchema = require('../models/companies');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
let companiesCollection = mongoose.model('company', companySchema, 'companies');

// Display list of all Authors.
exports.companies_list = function (req, res) {
    res.send('NOT IMPLEMENTED: Companies');
};

// Display detail page for a specific record label company.
exports.companies_detail = function (req, res) {
    res.send('NOT IMPLEMENTED: Book detail: ' + req.params.id);
};

//Handle company create on GET.
exports.companies_create = function (req, res) {
    res.send('NOT IMPLEMENTED: Company create');
};

// Display Company delete form on GET.
exports.companies_delete = function (req, res) {
    res.send('NOT IMPLEMENTED: Company delete');
};

// Display Company update form on GET.
exports.companies_update = function (req, res) {
    res.send('NOT IMPLEMENTED: Company update');
};