describe('schedulers', function () {
    beforeEach(module('schedulers'));

    var job, waitFor, schedule;

    beforeEach(inject(function (_schedule_, $timeout) {
        schedule = _schedule_;
        job = jasmine.createSpy('job');
        waitFor = function(ms) {
            $timeout.flush(ms);
        };
    }));

    describe('given a scheduled job', function () {
        beforeEach(function () {
            schedule.forPeriod(job, 1000);
        });

        it('then it should not execute before the interval has passed', function() {
            waitFor(999);
            expect(job.calls.count()).toEqual(0);
        });

        it('then it should execute when the interval has passed', function() {
            waitFor(1000);
            expect(job).toHaveBeenCalled();
        });

        it('then it should execute for each passing of the interval', function() {
            waitFor(1000);
            waitFor(1000);
            waitFor(1000);
            expect(job.calls.count()).toEqual(3);
        });
    });

    describe('if job should be executed immediately', function () {
        beforeEach(function () {
            schedule.forPeriod(job, 1000, true);
        });

        it('job is executed', function () {
            expect(job.calls.count()).toEqual(1);
        });

        it('job is executed again when the interval has passed', function() {
            waitFor(1000);
            expect(job.calls.count()).toEqual(2);
        });
    });

});