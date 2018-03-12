var request = require('request');
var admin = require('firebase-admin');
var serviceAccount = require('../serviceAccountKey.json');

var chargerServiceKey = 'uskEql5AYz34KZ2d3vu8o9%2B7gryoM31BXjO2GkBPoJ0QwvyF32e4HgHxiLo7ulYJ%2Bj5c823M2b4BiNFszSRprQ%3D%3D';
var chargerEndpoint = 'http://api.data.go.kr/openapi/elcty-car-chrstn-std';

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

var db = admin.firestore();

var queryString = 'serviceKey=' + chargerServiceKey + '&s_page=1' + '&s_list=100' + '&type=json';
var url = chargerEndpoint + '?' + queryString;

// http://api.data.go.kr/openapi/elcty-car-chrstn-std?serviceKey=uskEql5AYz34KZ2d3vu8o9%2B7gryoM31BXjO2GkBPoJ0QwvyF32e4HgHxiLo7ulYJ%2Bj5c823M2b4BiNFszSRprQ%3D%3D&s_page=1&s_list=100&type=json
// 'http://api.data.go.kr/openapi/elcty-car-chrstn-std?serviceKey=uskEql5AYz34KZ2d3vu8o9%252B7gryoM31BXjO2GkBPoJ0QwvyF32e4HgHxiLo7ulYJ%252Bj5c823M2b4BiNFszSRprQ%253D%253D&s_page=1&s_list=100&type=json'

request(url, function(error, response, body) {
    // console.log('result', body);
    splitResult = splitData(body.toString());
});

function splitData(data) {
    var arrResult = data.split('},');
    for (i = 0; i < arrResult.length; i++) {
        result = arrResult[i];
        result = result.replace('{', '');
        result = result.replace('[', '');
        result = result.replace(']', '');

        keyWithValue = result.split(',');
        // result = result.replace("\"", "");

        console.log(keyWithValue);
    }
}