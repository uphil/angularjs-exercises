'use strict';

angular.module('app')
.filter('findJobIndex', [function() {
    return function(list, job) {
        var index = list.findIndex(function(x) {
            return x.id === job.id;
        });

        return index;
    };
}]);
