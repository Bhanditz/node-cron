'use strict';

var expect = require('expect.js');
var sinon = require('sinon');
var Task = require('../../src/task');
var cron = require('../../src/node-cron');

describe('task at timezone', function () {
    it('should should perform at timezone', function () {
        var task = new Task('* 4 * * *', function () {
            this.executed += 1;
        }, "GMT-04:00");
        task.executed = 0;
        var date = new Date('August 19, 2018 00:00:00 GMT-03:00');
        date.setHours(date.getHours() + 1);
        task.update(date);
        date.setHours(date.getHours() + 3);
        task.update(date);
        date.setHours(date.getHours() + 1);
        task.update(date);
        expect(1).to.equal(task.executed);
    });

    describe('by node-cron', function () {
        beforeEach(function () {
            this.now = new Date('August 19, 2018 03:00:00 GMT-04:00');
            this.clock = sinon.useFakeTimers(this.now.getTime());
        });

        afterEach(function () {
            this.clock.restore();
        });

        it('should perform at timezone', function () {
            var executed = 0;
            var executedAt = null;
            var executedAt2 = null;
            var task = cron.schedule('* 4 * * *', function () {
                executed++;
                executedAt = new Date();
            }, true, "GMT-04:00");

            this.clock.tick(60 * 60 * 1000);
            this.now.setHours(this.now.getHours() + 1);

            expect(executedAt.getHours()).to.equal(this.now.getHours());
        });

    });
});
