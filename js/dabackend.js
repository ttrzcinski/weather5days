(function () {
    'use strict';
}());

var leweather;
var leposition;
//var ledate;

/**
 * Represents whole backend of the weather calendar.
 * 
 * @class DaBackend
 */
class DaBackend {

    constructor(daweather, dapostion) { //, dadate) {
        //
        this.leweather = (daweather) ? daweather : new DaWeather();
        //
        this.leposition = (dapostion) ? dapostion : new DaPosition();
        //
        //this.ledate = (dadate) ? dadate : new DaDate();
    }

    get weather() {
        return this.leweather;
    }

    get position() {
        return this.leposition;
    }

    //getDate() {
    //    return this.ledate;
    //}
}

function justRunIt() {
    document.getElementById('demo').innerHTML = 'I guess, your JavaScript is turn off..';
    //
    this.leposition = new DaPosition();
    if (this.leposition) {
        document.getElementById('demo').innerHTML = 'runIt 0';
        this.leposition.getMyLocation();
        document.getElementById('demo').innerHTML = 'runIt 1';
        //
        this.leweather = new DaWeather();
        document.getElementById('demo').innerHTML = 'runIt 2';
        if (this.leweather) {
            document.getElementById('demo').innerHTML = 'runIt 3';
            this.leweather.
            document.getElementById('demo').innerHTML = 'runIt 4';
            //
            //
            document.getElementById('demo').innerHTML = 'End of runIt';
        }
    }


}

module.exports = {
    justRunIt: justRunIt,
};