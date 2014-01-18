angular.module('schedulers', [])
    .factory('schedule', ['$timeout', ScheduleFactory]);

function ScheduleFactory($timeout) {
    return  {
        forPeriod: function (job, ms) {
            $timeout(function () {
                job();
                $timeout(job, ms);
            }, ms);
        }
    };
}