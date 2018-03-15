'use strict';
var tz = require('./timezones');

module.exports = (function(){
    /**
     *
     */

    function getUTCTime(date){
        var currentOffset = date.getTimezoneOffset() * 60000;
        if(currentOffset > 0) {
            return date.getTime() + currentOffset;
        } 
        return date.getTime() - currentOffset;
    }

    function atTimezone(date, timezoneName){
        var utcTime = getUTCTime(date);
        var time = utcTime + tz.getOffset(timezoneName);
        return new Date(time);
    }

    return {
        atTimezone: atTimezone
    }
})();