(function () {
  'use strict';
}());

const appId = 'db0586ae96c5940f50c640169cd2a211';

var xmlhttp = null;

var lat, lon;

class DaWeather {
  constructor(latitude, longitude) {
    this.lat = latitude;
    this.lon = longitude;
  }

  /**
   * Builds a full weatehr api call url with params of location and/or city.
   * 
   * @param float lon 
   * @param float lat 
   * @param string city 
   * @returns 
   */
  prepareUrl(lon, lat, city) {
    var url = '';
    if ((lon) && (lat)) {
      url = 'api.openweathermap.org/data/2.5/find?' +
        'lat=' + lat +
        '&lon=' + lon +
        '&cnt=3' +
        '&appid=' + appId;
    } else if (city) {
      url = 'api.openweathermap.org/data/2.5/forecast?' +
        'q=' + city + ',us'; // &mode=xml
      // '&appid=' + appId
    } else {
      document.getElementById('demo').innerHTML =
        'Couldn\'t obtain the location parameters';
    }
    // url = 'http://samples.openweathermap.org/data/2.5/forecast?lat=54.35202520000001&lon=18.6466384&appid=db0586ae96c5940f50c640169cd2a211'
    // Just a mock to see, is JSON of API's response is processed
    url = 'http://echo.jsontest.com/key/value/one/two';

    return url;
  }

  /**
   * 
   * 
   * @param {any} e 
   * @memberof DaWeather
   */
  processRequest(e) {
    // 4 means request completed, 200 means success HTTP response
    if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
      document.getElementById('demo').innerHTML = 'Request is processing..';
      // var response = JSON.parse(xmlhttp.responseText)
      document.getElementById('demo').innerHTML = 'Obtained: ' + xmlhttp.responseText;
    } else {
      document.getElementById('demo').innerHTML = 'Couldn\'t connect to Weather service';
    }
  }

  // Get my location first
  checkWeather() {
    document.getElementById('demo').innerHTML = 'Obtaining location for weather service';
    var currLoc = getMyLocation_asObject();
    if (currLoc) {
      document.getElementById('demo').innerHTML = 'Obtained location for weather service';
    }
    document.getElementById('demo').innerHTML = 'It is ' + currLocation.city;

    // function checkTheWeather () {
    var url = prepareUrl(currLoc.lat, currLoc.lon, null);
    //var url = prepareUrl(54, 12, null);
    var XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
    xmlhttp = new XMLHttpRequest();
    xmlhttp.open('GET', url, true);
    xmlhttp.send();
    document.getElementById('demo').innerHTML = 'Preprocess';
    xmlhttp.addEventListener('readystatechange', processRequest, false);
  }

}
