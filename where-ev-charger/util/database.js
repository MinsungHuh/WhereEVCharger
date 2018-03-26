var Client = require('pg');
var connectionString = "postgres://localhost:5432/where-ev-charger";

var client = new Client({
    connectionString: connectionString
});

exports.getAllChargerList = function() {
    var query = "SELECT * FROM charger ";

    client.connect();
    client.query(query)
        .then(res => { 
            client.end();
            console.log('result', res);
            return res;
         })
        .catch(e => {
            console.log('error', e);
            client.end();
            return undefined;
         });
};

exports.getChargerList = function(lat = undefined, lng = undefined, radian = 5000) {
    const query = "SELECT DISTINCT snm, adr, chgemange, cid, cst, ctp, dro, park, sid, " +
    "skind, skinds, skindt, utime, lat, lng, st_distancesphere(geom, {0}, {1}) FROM charger" + 
    "where st_distancesphere(geom, {0}, {1}) ";
    client.connect();
    client.query(query)
        .then(res => {
            client.end();
            console.log('result', res);
            return res;
        })
        .catch(exception => {
            console.log('error', exception);
            client.end();
            return undefined;
        });
};