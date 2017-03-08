'use strict';

(function(app) {

    function JobController(JobService) {
        var vm = this;

        vm.list = JobService.list();
        vm.statusList = JobService.statusList();

        vm.create = function(title, description) {
            JobService.create(title, description);
        };

        vm.update = function() {
            // ...
        };

        vm.delete = function(id) {
            JobService.delete(id);
        };
    }

    app.controller('JobController', ['JobService', JobController]);

})(swimlane);
