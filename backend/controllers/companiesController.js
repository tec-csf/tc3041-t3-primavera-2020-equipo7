var Company = require('../models/companies');

// Display list of all Authors.
exports.companies_list = function (req, res) {
    res.send('NOT IMPLEMENTED: Companies');
};

// Display detail page for a specific record label company.
exports.companies_detail = function (req, res) {
    res.send('NOT IMPLEMENTED: Book detail: ' + req.params.id);
};

//Handle company create on GET.
exports.companies_create_get = function (req, res) {
    res.send('NOT IMPLEMENTED: Company create POST');
};
// Handle Company create on POST.
exports.companies_create_post = function (req, res) {
    res.send('NOT IMPLEMENTED: Company create POST');
};

// Display Company delete form on GET.
exports.companies_delete_get = function (req, res) {
    res.send('NOT IMPLEMENTED: Company delete GET');
};

// Handle Company delete on POST.
exports.companies_delete_post = function (req, res) {
    res.send('NOT IMPLEMENTED: Company delete POST');
};

// Display Company update form on GET.
exports.companies_update_get = function (req, res) {
    res.send('NOT IMPLEMENTED: Company update GET');
};

// Handle Company update on POST.
exports.companies_update_post = function (req, res) {
    res.send('NOT IMPLEMENTED: Company update POST');
};