(function() {
    'use strict';

    angular
        .module('app', ['ngStorage'])
        .config([function() {
            console.log('config');
        }])
        .run(['$rootScope', function($rootScope, $location) {
            console.log('run');
        }])
        .controller('BaseController', ['AuthService', '$localStorage',
        function(authService, $localStorage) {
            var vm = this,
                authUser = $localStorage.authUser,
                templates = {
                    navTemplate : 'templates/nav.html',
                    loginTemplate : 'templates/login.html',
                    swimlaneTemplate : 'templates/swimlane.html'
                };

            vm.templates = templates;
            vm.login = true;

            if (authUser) {
                shift();
                vm.user = authUser.username;
            }

            vm.submit = function() {
                authService.login(vm.username, vm.password, function(result) {
                    if (result) {
                        shift();
                    }
                    else {
                        vm.error = 'Username or password is incorrect.';
                    }
                });
            };

            vm.logout = function() {
                authService.logout();

                reset();
            };

            function shift() {
                vm.swimlane = true;
                vm.login = false;
                vm.error = false;
            }

            function reset() {
                vm.swimlane = false;
                vm.login = true;

                vm.username = '';
                vm.password = '';
            }
        }])
        .factory('AuthService', ['$localStorage', function($localStorage) {
            var service = {};

            // setup fake user
            var fakeUser = {
                username: 'phil',
                password: 'a',
                token: 'abc'
            };

            service.login = function(username, password, response) {
                if (fakeUser.username === username &&
                    fakeUser.password === password) {

                    $localStorage.authUser = {
                        username: username,
                        token: fakeUser.token
                    };

                    response(true);
                }
                else {
                    response(false);
                }
            };

            service.logout = function() {
                delete $localStorage.authUser;
            };

            return service;
        }])
        .controller('JobController', ['JobService', 'JobStatusFilter', '$scope',
        function(JobService, JobStatusFilter, $scope) {
            var vm = this;

            vm.list = function(status) {
                var list = JobStatusFilter(JobService.list(), status);

                return list;
            };

            vm.create = function() {
                var job = {
                    id: JobService.list().length + 1,
                    title: vm.title,
                    description: vm.description,
                    status: "planned"
                },
                modal = angular.element("[data-dismiss=modal]");

                JobService.create(job);

                modal.trigger({ type: "click" });

                vm.list = function() {
                    var list = JobStatusFilter(JobService.list(), "planned");

                    return angular.copy(list);
                };
            };

            vm.update = function() {
                var ae = angular.element,
                    job = {
                        id: parseInt(ae('.job-update-form input[name=id]').val()),
                        name: ae('.job-update-form'),
                        title: ae('.job-update-form input[name=title]').val(),
                        description: ae('.job-update-form textarea[name=description]').val()
                    };

                JobService.update(job.id, job);

                ae("[data-dismiss=modal]").trigger({ type: "click" });

                vm.list = function() {
                    var list = JobStatusFilter(JobService.list());

                    console.log('new list', list);

                    return angular.copy(list);
                };
            };
        }])
        .service('JobService', [function() {
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

            service.create = function(job) {
                jobs.push(job);
            };

            service.list = function(filter) {
                return jobs;
            };

            service.update = function(id, detail) {
                var job = {
                    id: id,
                    title: detail.title,
                    description: detail.description
                },
                index = jobs.findIndex(function(x) {
                    return x.id === id;
                }),
                status = jobs[index].status;

                job.status = status;
                jobs[index] = job;
            };

            service.delete = function(job) {

            };

            service.get = function(id) {
                var job = jobs.filter(function(job) {
                    return job.id === id;
                });

                return job[0];
            };

            return service;
        }])
        .filter('JobStatus', [function() {
            function filter(jobs, status) {
                var result;

                if (status) {
                    result = jobs.filter(function(job) {
                        if (job.status === status) {
                            return job;
                        }
                    });
                }
                else {
                    result = jobs;
                }

                return result;
            }

            return filter;
        }])
        .directive('moveJob', ['JobService', function(JobService) {
            return {
                restrict: 'AE',
                controller: 'JobController',
                controllerAs: 'jobCtrl',
                link: function(scope, element, attrs, ctrl) {
                    element.on('dragend', function() {
                        var jobCtrl = scope.jobCtrl,
                            list = JobService.list(),
                            job = scope.job,
                            status = element.parent().attr('data-status'),
                            index = list.findIndex(function(x) {
                                return x.id === job.id;
                            }),
                            classStatuses = [
                                "alert-danger",
                                "alert-warning",
                                "alert-info",
                                "alert-success"
                            ].join(" ");

                        // update status
                        jobCtrl.list = function() {
                            list[index].status = status;

                            return list;
                        };

                        element.removeClass(classStatuses);

                        switch (status) {
                            case "planned":
                            case "working-on":
                                element.addClass('alert-danger');
                                break;
                            case "resolved":
                                element.addClass('alert-warning');
                                break;
                            case "qa-tested":
                                element.addClass('alert-info');
                                break;
                            case "completed":
                                element.addClass('alert-success');
                                break;
                            default:
                                element.addClass('alert-danger');
                        }

                        console.log('new list', jobCtrl.list());
                    });
                }
            };
        }])
        .directive('deleteJob', ['JobService', function(JobService) {
            return {
                restrict: 'AE',
                controller: 'JobController',
                controllerAs: 'jobCtrl',
                link: function(scope, element, attrs, ctrl) {
                    element.on('click', function() {
                        var parent = element.parent(),
                            job = parent.parent(),
                            id = parseInt(element.attr('data-id')),
                            list = JobService.list(),
                            index = list.findIndex(function(x) {
                                return x.id === id;
                            });

                        list.splice(index, 1); // remove

                        job.remove();

                        console.log('new list', list);
                    });
                }
            };
        }])
        .directive('updateJob', ['JobService', function(JobService) {
            return {
                restrict: 'AE',
                controller: 'JobController',
                controllerAs: 'jobCtrl',
                link: function(scope, element, attrs, ctrl) {
                    element.on('click', function() {
                        var id = parseInt(element.attr('data-id')),
                            ae = angular.element,
                            formFields = {
                                id: ae('.job-update-form input[name=id]'),
                                name: ae('.job-update-form'),
                                title: ae('.job-update-form input[name=title]'),
                                description: ae('.job-update-form textarea[name=description]')
                            };
                        var job;

                        if (id) {
                            job = JobService.get(id);
                        }

                        formFields.id.val(id);
                        formFields.title.val(job.title);
                        formFields.description.val(job.description);
                    });
                }
            };
        }]);
})();

// dirty
function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");

    try {
        ev.target.appendChild(document.getElementById(data));
    } catch (e) {
        console.log(e);
    }
}


$(function() {

    $('.job-create-modal').on('shown.bs.modal', function () {
        var form = $('.job-create-form');
        var input = $('.job-create-form input[name=title]').focus();

        form[0].reset();
    });

    $('.job-update-modal').on('shown.bs.modal', function () {
        var input = $('.job-update-form input[name=title]').focus();
    });

});
