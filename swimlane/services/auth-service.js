'use strict';

(function(app) {

    function AuthService($localStorage) {
        var service = {};

        // setup fake user
        var fakeUser = {
            username: 'phil',
            password: 'a',
            token: 'abc'
        };

        service.login = function(username, password) {
            if (fakeUser.username === username &&
                fakeUser.password === password) {

                $localStorage.authUser = {
                    username: username,
                    token: fakeUser.token
                };

                return true;
            }

            return false;
        };

        service.logout = function() {
            delete $localStorage.authUser;
        };

        return service;
    }

    app.service('AuthService', ['$localStorage', AuthService]);

})(swimlane);
