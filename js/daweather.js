var appId = 'db0586ae96c5940f50c640169cd2a211'

var url = 'http://samples.openweathermap.org/data/2.5/forecast?lat=54.4518786&lon=17.013882199999998&appid=b6907d289e10d714a6e88b30761fae22'

url = 'http://samples.openweathermap.org/data/2.5/forecast?' +
    'q=' + 'Gdańsk' + ',PL' +
    '&appid=' + appId

url = 'http://samples.openweathermap.org/data/2.5/forecast?lat=54.35202520000001&lon=18.6466384&appid=db0586ae96c5940f50c640169cd2a211'

url = 'http://echo.jsontest.com/key/value/one/two'

var XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest
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
xmlhttp.open('GET', url, true)
xmlhttp.send()
