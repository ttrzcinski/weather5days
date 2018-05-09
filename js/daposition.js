var xmlhttplLoc = null

// Current location - let it have boring default
var currLocation = { 'city': 'Słupsk',
  'country': 'PL',
  'lat': 54.464148,
  'lon': 17.028482,
  'renew': false }

/**
 * Called to process request of reading geolocation from internet connection.
 * The result is saved in currLocation property
 * @param {*} e  
 */
function processRequestLoc (e) {
  // 4 means request completed, 200 means success HTTP response
  if (xmlhttplLoc.readyState === 4 && xmlhttplLoc.status === 200) {
    xmlhttplLoc.responseText = xmlhttplLoc.responseText.replace(' ', '')
    var responseLoc = JSON.parse(xmlhttplLoc.responseText)
    currLocation.city = responseLoc.city
    currLocation.country = responseLoc.country
    currLocation.lat = responseLoc.loc.split(',')[0]
    currLocation.lon = responseLoc.loc.split(',')[1]
    currLocation.renew = true

    document.getElementById('mycity').innerHTML = '' + currLocation.city + ' (' + currLocation.country + ')'
    document.getElementById('locserv').innerHTML = ''
  } else {
    document.getElementById('mycity').innerHTML = 'Nowhere?!)'
    document.getElementById('locserv').innerHTML = 'Couldn\'t connect to Location service'
  }
}

//
function getMyLocation () {
  var daurl = 'https://ipinfo.io/json'

  xmlhttplLoc = new XMLHttpRequest()
  xmlhttplLoc.open('GET', daurl, true)
  xmlhttplLoc.send()
  document.getElementById('locserv').innerHTML = '' +
    'Preprocessing location based on internet provider.'
  xmlhttplLoc.addEventListener('readystatechange', processRequestLoc, false)

  /* {
  "city": "Gdańsk",
  "region": "Pomerania",
  "country": "PL",
  "loc": "54.3637,18.5558"
  } */
}

/* function showPosition () {
  if (navigator.geolocation) {
    var locationAgreed = false
    navigator.geolocation.getCurrentPosition(function (position) {
      locationAgreed = true
      // Prepare url to call weather api and obtain big JSON response
      var urlToCall = 'http://samples.openweathermap.org/data/2.5/forecast?' +
            'lat=' + position.coords.latitude +
            '&lon=' + position.coords.longitude +
            '&appid=' + appId
      // Show url in the result element
      document.getElementById('daresult').innerHTML = urlToCall
    })
    //
    if (!locationAgreed) {
      // Change it to inline message
      var noLocation = "Sorry, but I don't know your location."
      document.getElementById('daresult').innerHTML = noLocation
    }
  } else {
    document.getElementById('daresult').innerHTML =
    'Sorry, your browser does not support HTML5 geolocation.'
  }
}

function showPositionByCity () {
  // Read given city name
  var location = document.getElementById('dacity').value
  // Prepare url to call weather api and obtain big JSON response
  var urlToCall = 'http://samples.openweathermap.org/data/2.5/forecast?' +
    'q=' + location + ',PL' +
    '&appid=' + appId
  // Show url in the result element
  document.getElementById('daresult').innerHTML = urlToCall
}

module.exports = {
  showPosition: showPosition,
  showPositionByCity: showPositionByCity
} */

module.exports = {
  getCurrentPosition: getMyLocation,
  currLocation: currLocation
}
