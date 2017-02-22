(function() {
    'use strict';

    angular
        .module('app', ['ngStorage'])
        .config([function() {
            // console.log('config');
        }])
        .run(['$rootScope', function($rootScope, $location) {
            // console.log('run');
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
        }])
        .controller('JobController', ['JobService',
        function(JobService) {
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
        }])
        .service('AuthService', ['$localStorage', function($localStorage) {
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
        .service('JobService', ['$rootScope', 'findJobIndexFilter',
        function($rootScope, findJobIndexFilter) {
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
        }])
        .filter('findJobIndex', [function() {
            return function(list, job) {
                var index = list.findIndex(function(x) {
                    return x.id === job.id;
                });

                return index;
            };
        }])
        .directive('draggable', ['JobService', function(JobService) {
            return {
                restrict: 'A',
                link: function(scope, element, attrs) {
                    element[0].draggable = true;

                    element.on('dragstart', function(e) {
                        e.dataTransfer.effectAllowed = 'move';
                        e.dataTransfer.setData('Text', element.attr('job-id'));
                        this.classList.add('drag');
                        // console.log("dragstart");
                    });

                    element.on('dragend', function(e) {
                        var id = element.attr('job-id'),
                            status = element.parent().attr('data-status');
                        var detail = {
                            status: status
                        };

                        this.classList.remove('drag');
                        // console.log("dragend");

                        // update job status
                        JobService.update(parseInt(id), detail);

                        console.log('new list', JobService.list());
                    });
                }
            };
        }])
        .directive('droppable', [function() {
            return {
                scope: {
                    drop: '&'
                },
                controller: 'JobController',
                controllerAs: 'jobCtrl',
                link: function(scope, element) {
                    element.on('dragover', function(e) {
                        e.dataTransfer.dropEffect = 'move';
                        e.preventDefault();

                        this.classList.add('over');
                        // console.log("dragover");
                    });

                    element.on('dragenter', function(e) {
                        this.classList.add('over');
                        // console.log("dragenter");
                    });

                    element.on('dragleave', function(e) {
                        this.classList.remove('over');
                        // console.log("dragleave");
                    });

                    element.on('drop', function(e) {
                        var id = e.dataTransfer.getData('Text'),
                            job = angular.element(document.querySelector('.job-'+id))[0];

                        this.classList.remove('over');
                        this.appendChild(job);

                        // console.log('drop');
                    });
                }
            };
        }]);
})();
