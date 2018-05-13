(function () {
  'use strict';
}());

// JS counts days since 0-Sunday
const days = ['Sunday', 'Monday', 'Tuesday',
  'Wednesday', 'Thursday', 'Friday', 'Saturday'
];
// Month names needed as part of calendar
const monthNames = [
  'January', 'February', 'March',
  'April', 'May', 'June', 'July',
  'August', 'September', 'October',
  'November', 'December'
];
//App's Id = used for wather api
const appId = 'db0586ae96c5940f50c640169cd2a211';
// Hardcoded API of location service.  
const urlLocationAPI = 'http://ip-api.com/json';

var xmlhttplLoc = null;

var xmlhttp = null;

// Current location - let the default be boring
var currLocation = {
  'city': '', //'Słupsk',
  'country': '', //'PL',
  'lat': 0, //54.464148,
  'lon': 0, //17.028482,
  'renew': false
};
/* {
"city": "Gdańsk",
"region": "Pomerania",
"country": "PL",
"loc": "54.3637,18.5558"
} */

/**
 * Formats date to name_of_day, index full_month_name and year.
 * 
 * @param Date givenDate given date to format
 * @returns formated date
 */
function formatDate(givenDate) {
  let dayOfWeek = days[givenDate.getDay()];
  let day = givenDate.getDate();
  let monthNum = givenDate.getMonth();
  let year = givenDate.getFullYear();

  return dayOfWeek + ', ' + day + ' ' + monthNames[monthNum] + ' ' + year;
}

/**
 * Called to process request of reading geolocation from internet connection.
 * The result is saved in currLocation property
 * @param {*} e  
 */
function processRequestLoc(e) {
  // 4 means request completed, 200 means success HTTP response
  if (xmlhttplLoc.readyState === 4 && xmlhttplLoc.status === 200) {
    xmlhttplLoc.responseText = xmlhttplLoc.responseText.replace(' ', '');
    var responseLoc = JSON.parse(xmlhttplLoc.responseText);
    currLocation.city = responseLoc.city;
    currLocation.country = responseLoc.countryCode;//country;
    // Location is divided by ',' and needs to be split in lat and lon
    currLocation.lat = responseLoc.lat; //loc.split(',')[0];
    currLocation.lon = responseLoc.lon; //c.split(',')[1];
    currLocation.renew = true;

    if (currLocation.city && currLocation.country) {
      document.getElementById('mycity').innerHTML =
        '' + currLocation.city + ' (' + currLocation.country + ')';
    } else {
      document.getElementById('mycity').innerHTML =
        'Somewhere (' + currLocation.lat + ', ' + currLocation.lon + ')';
    }
  } else {
    document.getElementById('mycity').innerHTML = 'Nowhere?!';
    document.getElementById('demo').innerHTML =
      'Couldn\'t read Location\'s service response - (state is ' + xmlhttplLoc.readyState +
      ' and status is ' + xmlhttplLoc.status + ')';
  }
}

/**
 * Obtains location of user reading it from internet service provider.
 */
function showMyLocation() {
  //var XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
  xmlhttplLoc = new XMLHttpRequest();
  if (xmlhttplLoc) {
    xmlhttplLoc.open('GET', urlLocationAPI); //, true);
    xmlhttplLoc.send();
    document.getElementById('demo').innerHTML = 'showMyLocation 5';
    document.getElementById('demo').innerHTML = 'showMyLocation 6';
    xmlhttplLoc.addEventListener('readystatechange', processRequestLoc, false);
    document.getElementById('demo').innerHTML = 'showMyLocation 7';
  } else {
    document.getElementById('demo').innerHTML =
      'Looks like, sending requests from your Browser is blocked.';
  }
}

/**
   * Builds a full weatehr api call url with params of location and/or city.
   * 
   * @param float lon 
   * @param float lat 
   * @param string city 
   * @returns 
   */
  function prepareUrl(lon, lat, city, countryCode) {
    var url = '';
    if ((lon) && (lat)) {
      url = 'api.openweathermap.org/data/2.5/find?' +
        'lat=' + lat +
        '&lon=' + lon +
        '&cnt=3' +
        '&appid=' + appId;
    } else if ((city) && (countryCode)) {
      url = 'api.openweathermap.org/data/2.5/forecast?' +
        'q=' + city + ',' + countryCode + //; // &mode=xml
        '&appid=' + appId
    } else {
      document.getElementById('demo').innerHTML =
        'Couldn\'t obtain the location parameters needed to call weather forecast.';
    }
    //url = 'http://samples.openweathermap.org/data/2.5/forecast?lat=54.35202520000001&lon=18.6466384&appid=db0586ae96c5940f50c640169cd2a211'
    //url = 'http://samples.openweathermap.org/data/2.5/forecast?lat=54.35202520000001&lon=18.6466384&appid=db0586ae96c5940f50c640169cd2a211';
    // Just a mock to see, is JSON of API's response is processed
    //url = 'http://echo.jsontest.com/key/value/one/two';

    return url;
  }

  /**
   * Processing request to obtain weather forecast.
   * 
   * @param {any} e 
   */
  function processRequest(e) {
    // 4 means request completed, 200 means success HTTP response
    if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
      document.getElementById('demo').innerHTML = 'Request is processing..';
      // var response = JSON.parse(xmlhttp.responseText)
      document.getElementById('demo').innerHTML = 'Obtained: ' + xmlhttp.responseText;
    } else {
      document.getElementById('demo').innerHTML = 'Couldn\'t connect to Weather Service.'
        +' - state was ' + xmlhttp.readyState + ' and status was ' + xmlhttp.status;
    }
  }

  // Get my location first
  function showWeather() {
    document.getElementById('demo').innerHTML = 'Obtaining location for weather service';
    
    var url = prepareUrl(currLocation.lat, currLocation.lon, null);
    //var url = prepareUrl(54, 12, null);
    //var XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
    xmlhttp = new XMLHttpRequest();
    xmlhttp.open('GET', url, true);
    xmlhttp.send();
    document.getElementById('demo').innerHTML = 'Preprocess';
    xmlhttp.addEventListener('readystatechange', processRequest, false);
  }

function showCity() {
  showMyLocation();
  if (this.currLocation) {
    document.getElementById('mycity').innerHTML = this.currLocation.city;
  }
}

/**
 * Called in order to present calendar table with weather.
 */
function showDays() {
  let theNextDays = [];

  let d = new Date();
  let theresultdays = '';
  for (var i = 0; i < 5; i++) {
    d.setDate(d.getDate() + 1);
    theNextDays[i] = d;
    theresultdays +=
      '<tr><td>' + formatDate(theNextDays[i]) + '</td><td>' +
      '10' + '\xB0C</td><td>' +
      'Sunny' + '</td></tr>';
  }
  document.getElementById('resultdays').innerHTML = theresultdays;
}

module.exports = {
  showDays: showDays,
  showCity: showCity,
  showWeather: showWeather
};