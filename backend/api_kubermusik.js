/*
API para conectar la base de datos al front end usando mongoose

*/

var express = require('express')
var app = express()
var mongoose = require('mongoose')
var mongodb = 'mongodb+srv://Test:uhPoUIbK2lpNVHRm@cluster0-vnehv.gcp.mongodb.net/test?authSource=admin&replicaSet=Cluster0-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true' //missing
mongoose.connect(mongodb, {useNewUrlParser: true})

var db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))

// require module that you need to pull with
// var SomeModel = require('../models/somemodel')