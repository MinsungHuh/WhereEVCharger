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

request(url, function(error, response, body) {
    // console.log('result', body);
    // console.log('json parse result', JSON.stringify(body));
    var jsonResult = JSON.parse(body);
    
    splitData(jsonResult);
});

function splitData(data) {
    for (let i = 0; i < data.length; i++) {
        const element = data[i];
        
        // '휴점일': '연중무휴',
        // '관리업체명': '강원도 동해시청',
        // '주차료부과여부': 'N',
        // '급속충전기대수': '1',
        // '위도': '37.5264661',
        // '완속충전가능여부': 'Y',
        // '설치시도명': '강원도',
        // '경도': '129.1152192',
        // '소재지지번주소': '강원도 동해시 천곡동 809-1',
        // '급속충전타입구분': 'DC 콤보',
        // '완속충전기대수': '0',
        // '충전소명': '문화예술회관',
        // '급속충전가능여부': 'Y',
        // '소재지도로명주소': '강원도 동해시 평원로 15',
        // '관리업체전화번호': '033-530-2446',
        // '이용가능시작시각': '00:00',
    //     충전소위치상세': '지하주차장4층 A구역',
    // '이용가능종료시각': '23:59',
    // '데이터기준일자': '2017-11-20'

        var id = element['_id'];
        var offDate = element['휴점일'];
        var manageCompanyName = element['관리업체명'];
        var isPayParkingFee = element['주차료부과여부'];
        var fastChargerCount = element['급속충전기대수'];
        var lat = element['위도'];
        var isSlowChargeAvailable = element['완속충전가능여부'];
        var city = element['설치시도명'];
        var lng = element['경도'];
        var address = element['소재지지번주소'];
        var fastChargerType = element['급속충전타입구분'];
        var slowChargerCount = element['완속충전기대수'];
        var name = element['충전소명'];
        var isFastChargeAvailable = element['급속충전가능여부'];
        var roadAddress = element['소재지도로명주소'];
        var tel = element['관리업체전화번호'];
        var openTime = element['이용가능시작시각'];
        var detailAddress = element['충전소위치상세'];
    }
}