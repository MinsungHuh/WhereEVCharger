var express = require('express');
var request = require('request');
var database = require('../util/database');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.redirect('/list');
});

router.get('/list', function(req, res, next) {
    database.getChargerList()
});

module.exports = router;
