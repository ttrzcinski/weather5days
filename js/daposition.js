(function () {
  'use strict';
}());

var xmlhttplLoc = null;

// Current location - let the default be boring
var currLocation = {
  'city': 'Słupsk',
  'country': 'PL',
  'lat': 54.464148,
  'lon': 17.028482,
  'renew': false
};

// Hardcoded API of location service.  
const urlLocationAPI = 'https://ipinfo.io/json';

class DaPosition {
  constructor() {
    this.getMyLocation();
  }

  /**
   * Called to process request of reading geolocation from internet connection.
   * The result is saved in currLocation property
   * @param {*} e  
   */
  processRequestLoc(e) {
    // 4 means request completed, 200 means success HTTP response
    if (xmlhttplLoc.readyState === 4 && xmlhttplLoc.status === 200) {
      xmlhttplLoc.responseText = xmlhttplLoc.responseText.replace(' ', '');
      var responseLoc = JSON.parse(xmlhttplLoc.responseText);
      currLocation.city = responseLoc.city;
      currLocation.country = responseLoc.country;
      //Location is divided by ',' and needs to be split in lat and lon
      currLocation.lat = responseLoc.loc.split(',')[0];
      currLocation.lon = responseLoc.loc.split(',')[1];
      currLocation.renew = true;

      document.getElementById('mycity').innerHTML =
        '' + currLocation.city + ' (' + currLocation.country + ')';
      document.getElementById('locserv').innerHTML = '';
    } else {
      document.getElementById('mycity').innerHTML = 'Nowhere?!)';
      document.getElementById('locserv').innerHTML =
        'Couldn\'t connect to Location service';
    }
  }

  /**
   * Obtains location of user reading it from internet service provider.
   */
  getMyLocation() {
    let XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
    xmlhttplLoc = new XMLHttpRequest();
    xmlhttplLoc.open('GET', urlLocationAPI, true);
    xmlhttplLoc.send();
    document.getElementById('locserv').innerHTML = '' +
      'Reading location from internet service provider.';
    xmlhttplLoc.addEventListener('readystatechange', processRequestLoc, false);

    /* {
    "city": "Gdańsk",
    "region": "Pomerania",
    "country": "PL",
    "loc": "54.3637,18.5558"
    } */
  }

  getMyLocation_asObject() {
    //Call to update location
    this.getMyLocation();
    //Return current location
    return currLocation;
  }

}

module.exports = {
  currLocation: DaPosition.currLocation,
  getMyLocation: DaPosition.getMyLocation,
  getMyLocation_asObject: DaPosition.getMyLocation_asObject
};
