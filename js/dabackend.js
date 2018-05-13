(function () {
    'use strict';
}());

var leweather;
var leposition;
var ledate;

/**
 * Represents whole backend of the weather calendar.
 * 
 * @class DaBackend
 */
class DaBackend {
    constructor(daweather, dapostion, dadate) {
        //
        this.leweather = (daweather) ? daweather : new DaWeather();
        //
        this.leposition = (dapostion) ? dapostion : new DaPosition();
        //
        this.ledate = (dadate) ? dadate : new DaDate();
    }

    getWeather() {
        return this.leweather;
    }

    getPosition() {
        return this.leposition;
    }

    getDate() {
        return this.ledate;
    }
}

function justRunIt() {
    let daBack = new DaBackend();
    //daBack.getDate.showDays();
    //
    //
}