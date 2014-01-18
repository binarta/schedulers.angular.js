angular.module('schedulers', [])
    .factory('schedule', ['$timeout', ScheduleFactory]);

function ScheduleFactory($timeout) {
    var self;
    self = {
        forPeriod: function (job, ms) {
            $timeout(function () {
                job();
                self.forPeriod(job, ms);
            }, ms);
        }
    };
    return   self;
}