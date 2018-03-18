// http://www.ev.or.kr/portal/monitor/chargerList?orgme=N&orgetc=Y&_=1521353239485

var request = require('request-promise');
var admin = require('firebase-admin');
var service_account = require('../serviceAccountKey.json');
var end_point = 'http://www.ev.or.kr/portal/monitor/chargerList';

admin.initializeApp({
    credential: admin.credential.cert(service_account)
});
  
var db = admin.firestore();


function getEvGovernmentSite() {
    var option = {
        uri: end_point,
        json: true,
        qs: {
            orgme: 'N',
            orgetc: 'Y'
        }
    };

    request(option)
        .then(function(result) {
            saveToServer(result);
        }).catch(function(error) {
            console.log("parse", "parse error occured: " + error);
        });
}

function saveToServer(result) {
    if (result == null) {
        return;
    }

    arrResult = result.chargerList;
    for (const key in arrResult) {
        if (arrResult.hasOwnProperty(key)) {
            const element = arrResult[key];
            
            addCloudFirestoreData(element);
        }
    }
}

function addCloudFirestoreData(chargerModel) {
    var collectionRef = db.collection('charger');
    collectionRef.add(chargerModel).then(function(documentRef) {
        console.log('success add firestore', documentRef.id);
    });
}

getEvGovernmentSite();