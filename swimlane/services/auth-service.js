'use strict';

angular.module('app')
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
}]);
