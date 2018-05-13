(function () {
  'use strict';
}());

//JS counts days since 0-Sunday
var days = ['Sunday', 'Monday', 'Tuesday',
  'Wednesday', 'Thursday', 'Friday', 'Saturday'
];
var monthNames = [
  'January', 'February', 'March',
  'April', 'May', 'June', 'July',
  'August', 'September', 'October',
  'November', 'December'
];

// jshint unused: true
function showDate () {
  let d = new Date();
  d.setDate(d.getDate() + 1);
  document.getElementById('dadate').innerHTML = days[d.getDay()];
}

/**
 * Formats date to name_of_day, index full_month_name and year.
 * 
 * @param {any} givenDate given date to format
 * @returns formated date
 */
function formatDate (givenDate) {
  let dayOfWeek = days[givenDate.getDay()];
  let day = givenDate.getDate();
  let monthNum = givenDate.getMonth();
  let year = givenDate.getFullYear();

  return dayOfWeek + ', ' + day + ' ' + monthNames[monthNum] + ' ' + year;
}

/**
 * Called in order to present calendar table with weather.
 */
function showDays () {
  let theNextDays = [];

  let d = new Date();
  let theresultdays = '';
  for (var i = 0; i < 5; i++) {
    d.setDate(d.getDate() + 1);
    theNextDays[i] = d;
    theresultdays +=
        '<tr><td>'+formatDate(theNextDays[i])+'</td><td>' + 
        '10' + '\xB0C</td><td>' + 
        'Sunny' + '</td></tr>';
  }
  document.getElementById('resultdays').innerHTML = theresultdays;
}

module.exports = {
  showDate: showDate,
  showDays: showDays
};
