// http://www.ev.or.kr/portal/monitor/chargerList?orgme=N&orgetc=Y&_=1521353239485
String.prototype.format = function () {
    var args = [].slice.call(arguments);
    return this.replace(/(\{\d+\})/g, function (a){
        return args[+(a.substr(1,a.length-2))||0];
    });
};

var request_promise = require('request-promise');
var request = require('request');
var fs = require('fs');

var end_point = 'http://www.ev.or.kr/portal/monitor/chargerList';
var connectionString = "postgres://localhost:5432/where-ev-charger";
const { Client } = require('pg');

const client = new Client({
    connectionString: connectionString
});

getEvGovernmentSite();

function getEvGovernmentSite() {
    var option = {
        uri: end_point,
        json: true,
        qs: {
            orgme: 'N',
            orgetc: 'Y'
        }
    };

    request_promise(option)
        .then(function(result) {
            console.log('success response data');
            insertData(result);
        }).catch(function(error) {
            console.log("parse", "parse error occured: " + error);
        });
}

function insertData(data) {
    if (data == null) {
        return;
    }

    var query = 'INSERT INTO charger (adr, chgeMange, cid, cst, ctp, distant, dro, hol, park, ' + 
        'sid, skind, skinds, skindt, snm, tst, utime, lat, lng, geom) VALUES ';
    for (var key in data.chargerList) {
        var element = data.chargerList[key];
        
        if (key != 0) {
            query += ", ";
        }

        query += "(";
        query += "'" + element.adr + "', ";
        query += "'" + element.chgeMange + "', ";
        query += "'" + element.cid + "', ";
        query += "'" + element.cst + "', ";
        query += "'" + element.ctp + "', ";
        query += "'" + element.distant + "', ";
        query += "'" + element.dro + "', ";
        query += "'" + element.hol + "', ";
        query += "'" + element.park + "', ";
        query += "'" + element.sid + "', ";
        query += "'" + element.skind + "', ";
        query += "'" + element.skinds + "', ";
        query += "'" + element.skindt + "', ";
        query += "'" + element.snm + "', ";
        query += "'" + element.tst + "', ";
        query += "'" + element.utime + "', ";
        
        var lat = element.x;
        var lng = element.y;

        if (lat != null && lat != undefined && lat != '' && lng != null && lng != undefined && lng != '') {
            query += "'" + lat + "', ";
            query += "'" + lng + "', ";
            query += "ST_SetSRID(ST_MakePoint(" + lng + ", " + lat + "), 4326) )";
        } else {
            query += "'" + 0.0 + "', ";
            query += "'" + 0.0 + "', ";
            query += "ST_SetSRID(ST_MakePoint(" + 0.0 + ", " + 0.0 + "), 4326) )";
        }
    }

    fs.writeFile('/Users/minsung/Desktop/Workspace/where-ev-charger-front-service/query.txt', query, err => {
        if (err) {
            console.log('error', err);
        }
    });

    client.connect();
    client.query(query)
        .then(res => console.log('query success!'))
        .catch(e => {console.log(e.stack)});
}

// getEvGovernmentSite();