const { Pool } = require('pg');
const pool = new Pool({
    user: '',
    host: 'localhost',
    database: 'where-ev-charger',
    password: '',
    port: 5432,
});
pool.connect();

// module.exports = {
//     query: (text, params) => pool.query(text, params)
// };

module.exports = {
    query: (text, params, callback) => {
        return pool.query(text, params, callback);
    }
};

// exports.getAllChargerList = function() {
//     var query = "SELECT * FROM charger ";

//     // client = connectDatabase()
//     client.query(query)
//         .then(res => { 
//             client.end();
//             console.log('result', res);
//             return res;
//          })
//         .catch(e => {
//             console.log('error', e);
//             client.end();
//             return undefined;
//          });
// };

// exports.getChargerList = function(lat = undefined, lng = undefined, radian = 5000) {
//     const query = "SELECT DISTINCT snm, adr, chgemange, cid, cst, ctp, dro, park, sid, " +
//     "skind, skinds, skindt, utime, lat, lng, st_distancesphere(geom, {0}, {1}) FROM charger" + 
//     "where st_distancesphere(geom, {0}, {1}) ";
    
//     client.connect();
//     client.query(query)
//         .then(res => {
//             client.end();
//             console.log('result', res);
//             return res;
//         })
//         .catch(exception => {
//             console.log('error', exception);
//             client.end();
//             return undefined;
//         });
// };

// function connectDatabase() {
//     const client = new Client({
//         user: '',
//         host: 'localhost',
//         database: 'where-ev-charger',
//         password: '',
//         port: 5432,
//     });
//     return client.connect();
// }