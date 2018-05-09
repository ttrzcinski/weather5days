var days = ['Sunday', 'Monday', 'Tuesday',
  'Wednesday', 'Thursday', 'Friday', 'Saturday'
]
var monthNames = [
  'January', 'February', 'March',
  'April', 'May', 'June', 'July',
  'August', 'September', 'October',
  'November', 'December'
]

// jshint unused: true
function showDate () {
  var d = new Date()
  d.setDate(d.getDate() + 1)
  document.getElementById('dadate').innerHTML = days[d.getDay()]
}

function formatDate (givenDate) {
  var dayOfWeek = days[givenDate.getDay()]
  var day = givenDate.getDate()
  var monthNum = givenDate.getMonth()
  var year = givenDate.getFullYear()

  return dayOfWeek + ', ' + day + ' ' + monthNames[monthNum] + ' ' + year
}

// jshint unused: true
function showDays () {
  var theNextDays = []
  /*
    {"dayName":"Wednesday","temp":"12", "icon":"sun"  },
    {"dayName":"Thursday","temp":"13", "icon":"cloud" },
    {"dayName":"Friday","temp":"14", "icon":"rain" }
    */
  // alert("Length of theNextDays is " + theNextDays.length);

  var d = new Date()
  var theresultdays = ''
  for (var i = 0; i < 5; i++) {
    d.setDate(d.getDate() + 1)
    theNextDays[i] = d
    theresultdays +=
        '<li class="list-group-item">' + formatDate(theNextDays[i]) + '</li>'
    // + " : " + theNextDays[i].temp + "\xB0C</li>";
  }
  document.getElementById('resultdays').innerHTML = theresultdays
}

module.exports = {
  showDate: showDate,
  showDays: showDays
}
