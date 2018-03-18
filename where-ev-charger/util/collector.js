var rp = require('request-promise');
var admin = require('firebase-admin');
var serviceAccount = require('../serviceAccountKey.json');

var chargerServiceKey = 'uskEql5AYz34KZ2d3vu8o9+7gryoM31BXjO2GkBPoJ0QwvyF32e4HgHxiLo7ulYJ+j5c823M2b4BiNFszSRprQ==';
var chargerEndpoint = 'http://api.data.go.kr/openapi/elcty-car-chrstn-std';

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

var db = admin.firestore();
var options = {
  uri: chargerEndpoint,
  qs: {
    serviceKey: chargerServiceKey,
    s_page: 1,
    s_list: 999999,
    type: 'json'
  },
  headers: {
    'User-Agent': 'Request-Promise'
  },
  json: true
};

rp(options)
  .then(function(result) {
    parseData(result);
  })
  .catch(function(error) {
    console.log('error', error);
  });


function parseData(data) {
  for (i = 0; i < data.length; i++) {
      var element = data[i];

      var id = element['_id'];
      var name = element['충전소명'];
      var lat = floatChecker(element['위도']);
      var lng = floatChecker(element['경도']);
      var location = new admin.firestore.GeoPoint(lat, lng);
      var manageCompanyName = element['관리업체명'];
      var isPayParkingFee = booleanChecker(element['주차료부과여부']);
      var isFastChargeAvailable = booleanChecker(element['급속충전가능여부']);

      var isSlowChargeAvailable = booleanChecker(element['완속충전가능여부']);
      var slowChargerCount = 0;
      if (isSlowChargeAvailable) {
        slowChargerCount = intChecker(element['완속충전기대수']);
      }

      var fastChargerType = null;
      var fastChargerCount = 0;
      if (isFastChargeAvailable) {
        fastChargerType = fastChargerTypeChecker(element['급속충전타입구분']);  
        fastChargerCount = intChecker(element['급속충전기대수']);
      }
      
      var tel = element['관리업체전화번호'];
      var city = element['설치시도명'];
      var address = element['소재지지번주소'];
      var detailAddress = element['충전소위치상세'];
      var roadAddress = element['소재지도로명주소'];
      var openTime = element['이용가능시작시각'];
      var closeTime = element['이용가능종료시각'];
      var offDate = element['휴점일'];
      var regDate = element['데이터기준일자'];

      var chargerModel = {
        id: id,
        name: name,
        location: location,
        manage_company_name: manageCompanyName,
        is_pay_parking_fee: isPayParkingFee,
        is_fast_charge_available: isFastChargeAvailable,
        fast_charger_type: fastChargerType,
        fast_charger_count: fastChargerCount,
        is_slow_charge_available: isSlowChargeAvailable,
        slow_charger_count: slowChargerCount,
        tel: tel,
        city: city,
        address: address,
        detail_address: detailAddress,
        road_address: roadAddress,
        open_time: openTime,
        close_time: closeTime,
        off_date: offDate,
        reg_date: regDate
      };
      
      console.log('hello', chargerModel.name);
      addCloudFirestoreData(chargerModel);
  }
}

function addCloudFirestoreData(chargerModel) {
  var collectionRef = db.collection('charger');
  collectionRef.add(chargerModel).then(function(documentRef) {
    console.log('success add firestore', documentRef.id);
  });
}

function booleanChecker(data) {
  return data == 'Y' ? true : false;
}

function floatChecker(data) {
  if (data == null || data == undefined || data == '') {
    return 0;
  }

  if (typeof data === 'string') {
    return parseFloat(data);
  }
}

function intChecker(data) {
  if (data == null || data == undefined) {
    return 0;
  }

  if (typeof data === 'string') {
    return parseInt(data);
  }
}

function fastChargerTypeChecker(data) {
  if (data == null) {
    return null;
  }

  if (typeof data == 'string') {
    var object = null;
    if (data.indexOf("+") != -1) {
      object = data.split("+");
    } else if (data.indexOf(",") != -1) {
      object = data.split(",");
    }

    if (object != null) {
      for (var j=0; j<object.length; j++) {
        object[j].replace("\"", "").trim();
        object[j].replace("\'", "").trim();
      }
    }
    return object;
  }
}