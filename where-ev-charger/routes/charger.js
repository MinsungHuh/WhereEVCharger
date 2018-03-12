var express = require('express');
var request = require('request');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.redirect('/get_charger_list');
});

router.get('/get_charger_list', function(req, res, next) {
    
});

module.exports = router;
