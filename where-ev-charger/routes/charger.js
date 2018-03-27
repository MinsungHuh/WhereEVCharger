const format = require('string-format');
const express = require('express');
// const Router = require('express-promise-router');
const db = require('../util/database');
const router = express.Router();

// const router = new Router();

/* GET home page. */
router.get('/list/lat/:lat/lng/:lng', function(req, res, next) {
    const lat = req.params.lat;
    const lng = req.params.lng;

    console.log('lat', lat);
    console.log('lng', lng);

    var query = format('SELECT DISTINCT snm, adr, chgemange, cid, cst, ctp, dro, park, sid, skind, skinds, skindt, utime, lat, lng, st_distancesphere(geom, st_makepoint({0}, {1})) FROM charger where st_distancesphere(geom, st_makepoint({0}, {1})) <= 50000', lng, lat);
    // var query = 'SELECT DISTINCT snm, adr, chgemange, cid, cst, ctp, dro, park, sid, skind, skinds, skindt, utime, lat, lng, st_distancesphere(geom, st_makepoint({0}, {1})) FROM charger where st_distancesphere(geom, st_makepoint({0}, {1})) <= 50000'.string_format(lng, lat);
    console.log('myquery', query);

    db.query(query, (err, response) => {
        if (err) {
            console.log('error', err);
            return next(err);
        }
        res.json(response.rows[0]);
        // res.send(response.rows[0]);
    });
});

router.get('/:id', function(req, res) {
    res.send('hello bro~');
    var id = req.params;
    // database.getChargerList();
});

module.exports = router;