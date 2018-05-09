var appId = 'db0586ae96c5940f50c640169cd2a211'

var xmlhttp = null

function prepareUrl (lon, lat, city) {
  var url = ''
  if (lon != null && lat != null) {
    url = 'api.openweathermap.org/data/2.5/find?' +
    'lat=' + lat +
    '&lon=' + lon +
    '&cnt=3' +
    '&appid=' + appId
  } else {
    url = 'api.openweathermap.org/data/2.5/forecast?' +
    'q=' + city + ',us' // &mode=xml
    // '&appid=' + appId
  }
  // url = 'http://samples.openweathermap.org/data/2.5/forecast?lat=54.35202520000001&lon=18.6466384&appid=db0586ae96c5940f50c640169cd2a211'
  // just a mock
  url = 'http://echo.jsontest.com/key/value/one/two'

  return url
}

function processRequest (e) {
  // 4 means request completed, 200 means success HTTP response
  if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
    document.getElementById('demo').innerHTML = 'Request is processing..'
    // var response = JSON.parse(xmlhttp.responseText)
    document.getElementById('demo').innerHTML = 'Obtained: ' + xmlhttp.responseText
  } else {
    document.getElementById('demo').innerHTML = 'Couldn\'t connect to Weather service'
  }
}

// Get my location first
getMyLocation()
// document.getElementById('daresult').innerHTML = 'It is ' + currLocation.city

// function checkTheWeather () {
var url = prepareUrl(54, 12, null)
// document.getElementById('demo').innerHTML = url
// url = 'https://ipinfo.io/json'
document.getElementById('demo').innerHTML = 'preinit1'
// document.getElementById('demo').innerHTML = 'Checking the weather'
// var XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest
document.getElementById('demo').innerHTML = 'preinit2'
xmlhttp = new XMLHttpRequest()
document.getElementById('demo').innerHTML = 'preinit3'
xmlhttp.open('GET', url, true)
document.getElementById('demo').innerHTML = 'preinit4'
xmlhttp.send()
document.getElementById('demo').innerHTML = 'preinit5'

document.getElementById('demo').innerHTML = 'Preprocess'
xmlhttp.addEventListener('readystatechange', processRequest, false)
// }

// Prepare URL based on given location
// checkTheWeather()

/* function showWeather () {
  document.getElementById('demo').innerHTML = 'Showing'
} */

/* var XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest
var xmlhttp = new XMLHttpRequest()
xmlhttp.onreadystatechange = function () {
  if (this.readyState === 4 && this.status === 200) {
    // alert(this.responseText.length);
    var myObj = JSON.parse(this.responseText)
    document.getElementById('demo').innerHTML = JSON.stringify(myObj, null, 2)// myObj.list[1];
  } else {
    document.getElementById('demo').innerHTML = 'No response - error ' + this.status + ' with status ready:' + this.readyState
  }
}
var url = prepareUrl(54, 12, null)
xmlhttp.open('GET', url, true)
xmlhttp.send() */
