var appId = 'db0586ae96c5940f50c640169cd2a211'

function showPosition () {
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
}
