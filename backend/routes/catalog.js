var express = require('express');
var router = express.Router();

// Require controller modules.
var album_controller = require('../controllers/albumController');
var artist_controller = require('../controllers/artistsController');
var companies_controller = require('../controllers/companiesController');
var song_controller = require('../controllers/songController');

/// BOOK ROUTES ///

// GET catalog home page.
router.get('/', album_controller.index);

// GET request for creating a Book. NOTE This must come before routes that display Book (uses id).
router.get('/album/create', album_controller.album_create_get);

// POST request for creating Book.
router.post('/album/create', album_controller.album_create_post);

// GET request to delete Book.
router.get('/album/:id/delete', album_controller.album_delete_get);

// POST request to delete album.
router.post('/album/:id/delete', album_controller.album_delete_post);

// GET request to update album.
router.get('/album/:id/update', album_controller.album_update_get);

// POST request to update album.
router.post('/album/:id/update', album_controller.album_update_post);

// GET request for one album.
router.get('/album/:id', album_controller.album_detail);

// GET request for list of all album items.
router.get('/albums', album_controller.album_list);

/// artist ROUTES ///

// GET request for creating Author. NOTE This must come before route for id (i.e. display author).
router.get('/artist/create', artist_controller.artist_create_get);

// POST request for creating artist.
router.post('/artist/create', artist_controller.artist_create_post);

// GET request to delete artist.
router.get('/artist/:id/delete', artist_controller.artist_delete_get);

// POST request to delete artist.
router.post('/artist/:id/delete', artist_controller.artist_delete_post);

// GET request to update artist.
router.get('/artist/:id/update', artist_controller.artist_update_get);

// POST request to update artist.
router.post('/artist/:id/update', artist_controller.artist_update_post);

// GET request for one artist.
router.get('/artist/:id', artist_controller.artist_detail);

// GET request for list of all artists.
router.get('/artists', artist_controller.artist_list);

/// COMPANY ROUTES ///

// GET request for creating a company. NOTE This must come before route that displays Genre (uses id).
router.get('/companies/create', companies_controller.companies_create_get);

//POST request for creating companies.
router.post('/companies/create', companies_controller.companies_create_post);

// GET request to delete companies.
router.get('/companies/:id/delete', companies_controller.companies_delete_get);

// POST request to delete companies.
router.post('/companies/:id/delete', companies_controller.companies_delete_post);

// GET request to update companies.
router.get('/companies/:id/update', companies_controller.companies_update_get);

// POST request to update companies.
router.post('/companies/:id/update', companies_controller.companies_update_post);

// GET request for one companies.
router.get('/companies/:id', companies_controller.companies_detail);

// GET request for list of all companies.
router.get('/companies', companies_controller.companies_list);

/// SONGS ROUTES ///

// GET request for creating a BookInstance. NOTE This must come before route that displays BookInstance (uses id).
router.get('/song/create', song_controller.song_create_get);

// POST request for creating song. 
router.post('/song/create', song_controller.song_create_post);

// GET request to delete song.
router.get('/song/:id/delete', song_controller.song_delete_get);

// POST request to delete song.
router.post('/song/:id/delete', song_controller.song_delete_post);

// GET request to update song.
router.get('/song/:id/update', song_controller.song_update_get);

// POST request to update song.
router.post('/song/:id/update', song_controller.song_update_post);

// GET request for one song.
router.get('/song/:id', song_controller.song_detail);

// GET request for list of all song.
router.get('/songs', song_controller.song_list);

module.exports = router;