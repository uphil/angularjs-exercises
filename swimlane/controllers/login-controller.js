'use strict';

(function(app) {

    function LoginController(authService, $localStorage) {
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
            if (authService.login(vm.username, vm.password)) {
                shift();
            }
            else {
                vm.error = 'Username or password is incorrect.';
            }
        };

        vm.logout = function() {
            authService.logout();

            reset();
        };
    }

    app.controller('LoginController', ['AuthService', '$localStorage', LoginController]);

})(swimlane);
