String.prototype.format = function() {
    var a = this;
    for (k in arguments) {
      a = a.replace("{" + k + "}", arguments[k])
    }
    return a;
  }

var express = require('express');
// const Router = require('express-promise-router');
var db = require('../util/database');
var router = express.Router();

// const router = new Router();

/* GET home page. */
router.get('/list/lat/:lat/lng/:lng', function(req, res, next) {
    res.send('hello bro~');
    const lat = req.params.lat;
    const lng = req.params.lng;

    console.log('lat', lat);
    console.log('lng', lng);

    var query = 'SELECT DISTINCT snm, adr, chgemange, cid, cst, ctp, dro, park, sid, ' +
    'skind, skinds, skindt, utime, lat, lng, st_distancesphere(geom, st_makepoint({1}, {2})) FROM charger' + 
    'where st_distancesphere(geom, st_makepoint({3}, {4})) <= 50000'.format(lng, lat, lng, lat);
    console.log('myquery', query);

    db.query(query, (err, res) => {
        if (err) {
            console.log('error', err);
            return next(err);
        }
        res.send(res.rows[0]);
    });
});

router.get('/:id', function(req, res) {
    res.send('hello bro~');
    var id = req.params;
    // database.getChargerList();
});

module.exports = router;