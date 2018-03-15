'use strict';

var expect = require('expect.js');
var timezone = require('../../src/timezone/timezone-converter');

describe('convert timezone', function() {

  it('should convert a date to greenwich timezone', function() {
    var date = new Date('August 19, 2018 23:00:00 GMT-03:00');
    var relativeDate = timezone.atTimezone(date, "Greenwich");
    expect(relativeDate.getDate()).to.equal(20);
    expect(relativeDate.getHours()).to.equal(2);
  });

  it('should convert a date to greenwich timezone', function() {
    var date = new Date('August 19, 2018 00:00:00 GMT-03:00');
    var relativeDate = timezone.atTimezone(date, "Greenwich");
    expect(relativeDate.getDate()).to.equal(19);
    expect(relativeDate.getHours()).to.equal(3);
  });

  it('should convert a date to Sydney timezone', function() {
    var date = new Date('August 19, 2018 14:00:00 GMT+11:00');
    var relativeDate = timezone.atTimezone(date, "Greenwich");
    expect(relativeDate.getHours()).to.equal(3);
  });


  it('should convert a date to America/Virgin timezone', function() {
    var date = new Date('August 19, 2018 10:00:00 GMT-03:00');
    var relativeDate = timezone.atTimezone(date, "America/Virgin")
    expect(relativeDate.getHours()).to.equal(9);
  });  
});
