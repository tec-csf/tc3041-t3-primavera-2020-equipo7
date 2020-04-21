const express = require('express');
const router = express.Router();

// Require controller modules.
const album_controller = require('../controllers/albumController');
const artist_controller = require('../controllers/artistsController');
const companies_controller = require('../controllers/companiesController');
const song_controller = require('../controllers/songController');

/// BOOK ROUTES ///

// // GET catalog home page.
// router.get('/', album_controller.index);


//////////////////// ALBUMS ROUTES ///////////////////////

// POST request for creating an album
router.post('/albums/', album_controller.album_create);

// DELETE request to delete Book.
router.delete('/albums/:id/', album_controller.album_delete);

// POST request to update album.
router.post('/albums/:id/', album_controller.album_update);

// GET request for one album.
router.get('/album/:id/', album_controller.album_detail);

// GET request for list of all album items.
router.get('/albums/:page_no/', album_controller.album_list);

//Search for an album with its name
router.post('/album/:string/', album_controller.album_search);

/// artist ROUTES ///

// POST request for creating Author.
router.post('/artists/', artist_controller.artist_create);

// DELETE request to delete artist.
router.delete('/artists/:id/', artist_controller.artist_delete);

// POST request to update artist.
router.post('/artists/:id/', artist_controller.artist_update);

// GET request for list of all artists.
router.get('/artists/:page_no/', artist_controller.artist_list);

// POST artists by name
router.get('/artist/:string/', artist_controller.artist_name);

/// COMPANY ROUTES ///

// POST request for creating a company.
router.post('/companies/', companies_controller.companies_create);

// POST request to delete companies.
router.delete('/companies/:id/', companies_controller.companies_delete);

// GET request to update companies.
router.post('/companies/:id/', companies_controller.companies_update);

// GET request for one company.
router.get('/company/:id/', companies_controller.companies_detail);

// GET request for list of all companies.
router.get('/companies/:page_no/', companies_controller.companies_list);

/// SONGS ROUTES ///

// POST request for creating song. 
router.post('/songs/', song_controller.song_create);

//DELETE request to delete song
router.delete('/songs/:id/', song_controller.song_delete);

// POST request to update song.
router.post('/songs/:id/', song_controller.song_update);

// GET request for one song.
router.get('/song/:id/', song_controller.song_detail);

// GET request for list of all song.
router.get('/songs/:page_no/', song_controller.song_list);

//Search for a song with its name using POST
router.post('/song/:string/', song_controller.song_search);

//List songs with category filter (facet)
router.get('/songs/categories/:page_no', song_controller.song_cats);

//EXPORTING all routers to the main app
module.exports = router;