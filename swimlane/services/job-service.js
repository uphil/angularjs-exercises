'use strict';

(function(app) {

    function JobService(findJobIndexFilter, ticketStatusFilter) {
        var service = {},
            statuses = [
                "Planned",
                "Working On",
                "Resolved",
                "Qa Tested",
                "Completed"
            ],
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

        service.generateNextId = function() {
            var math = Math,
                mathMax = math.max,
                id = mathMax.apply(math, jobs.map(getIds));

            function getIds(job) {
                return job.id;
            }

            return parseInt(++id);
        };

        service.create = function(title, description) {
            var job = {
                id: this.generateNextId(),
                title: title,
                description: description,
                status: ticketStatusFilter()
            };

            jobs.push(job);

            return job;
        };

        service.list = function() {
            return jobs;
        };

        service.update = function(detail) {
            var job = this.get(detail.id),
                status = ticketStatusFilter(detail.status);

            if (job && status) {
                service.delete(job.id);

                job.id = service.generateNextId();
                job.status = status;

                jobs.push(job);
            }
        };

        service.delete = function(id) {
            var job = this.get(id),
                index = findJobIndexFilter(jobs, job);

            if (job) {
                jobs.splice(index, 1);
            }
        };

        service.get = function(id) {
            var matched = jobs.filter(findId),
                job = matched[0];

            function findId(job) {
                return job.id === parseInt(id);
            }

            return (job) ? job : null;
        };

        service.statusList = function() {
            return statuses;
        };

        return service;
    }

    app.service('JobService', ['findJobIndexFilter',
                                'ticketStatusFilter',
                                JobService]);

})(swimlane);
