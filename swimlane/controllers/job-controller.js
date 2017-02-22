'use strict';

angular.module('app')
.controller('JobController', ['JobService', function(JobService) {
    var vm = this;

    vm.list = JobService.list();

    vm.create = function() {
        JobService.create({
            title: vm.title,
            description: vm.description
        });
    };

    vm.update = function() {
        // JobService.update();
    };

    vm.delete = function(id) {
        JobService.delete(id);
    };
}]);
