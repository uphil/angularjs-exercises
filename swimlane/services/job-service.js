'use strict';

angular.module('app')
.service('JobService', ['$rootScope', 'findJobIndexFilter', function($rootScope, findJobIndexFilter) {
    var service = {},
        jobs = [
            {
                id: 1,
                title: "Job 1",
                description: "Some description here..",
                status: "planned"
            },
            {
                id: 2,
                title: "Job 2",
                description: "Some description here...",
                status: "working on"
            },
            {
                id: 3,
                title: "Job 3",
                description: "Some description here...",
                status: "resolved"
            },
            {
                id: 4,
                title: "Job 4",
                description: "Some description here...",
                status: "qa tested"
            },
            {
                id: 5,
                title: "Job 5",
                description: "Some description here...",
                status: "completed"
            }
        ];

    service.getListCount = function () {
        return jobs.length;
    };

    service.create = function(job) {
        if (typeof job !== 'object') {
            // error here..
            return null;
        }

        // set default status
        job.status = 'planned';

        // set id
        job.id = service.getListCount() + 1;
        jobs.push(job);

        $rootScope.$broadcast('added', job);

        return job;
    };

    service.list = function() {
        return jobs;
    };

    service.update = function(id, detail) {
        var job = service.get(id),
            index = findJobIndexFilter(jobs, job);

        if (detail.status) {
            job.status = detail.status;
        }

        jobs[index] = job;
    };

    service.delete = function(id) {
        var job = service.get(id),
            index = findJobIndexFilter(jobs, job);

        jobs.splice(index, 1);
    };

    service.get = function(id) {
        var job = jobs.filter(function(job) {
            return job.id === id;
        });

        return job[0];
    };

    return service;
}]);
