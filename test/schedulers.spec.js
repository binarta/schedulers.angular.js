describe('schedulers', function () {
    beforeEach(module('schedulers'));

    describe('given a scheduled job', function () {
        var job, waitFor;

        beforeEach(inject(function (schedule, $timeout) {
            job = jasmine.createSpy('job');
            schedule.forPeriod(job, 1000);
            waitFor = function(ms) {
                $timeout.flush(ms);
            };
        }));

        it('then it should not execute before the interval has passed', function() {
            waitFor(999);
            expect(job.calls.length).toEqual(0);
        });

        it('then it should execute when the interval has passed', function() {
            waitFor(1000);
            expect(job).toHaveBeenCalled();
        });

        it('then it should execute for each passing of the interval', function() {
            waitFor(1000);
            waitFor(1000);
            waitFor(1000);
            expect(job.calls.length).toEqual(3);
        });
    });
});