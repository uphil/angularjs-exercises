'use strict';

angular
    .module('app', ['ngStorage'])
    .config([function() {
        // console.log('config');
    }])
    .run(['$rootScope', function($rootScope) {
        // console.log('run');
    }]);
