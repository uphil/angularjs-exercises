'use strict';

angular.module('app')
.controller('BaseController', ['AuthService', '$localStorage', function(authService, $localStorage) {
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
}]);
