'use strict';
var timezones = require('../../timezones');

module.exports = (function(){

    var tz = {};

    for(var key in timezones){
        var value = timezones[key];
        tz[key.toLowerCase()] = value; 
    }

    function getOffset(tzName){
        return tz[tzName.toLowerCase()] / 100 * 60 * 60000;
    }

    return {
        getOffset: getOffset
    }
})();