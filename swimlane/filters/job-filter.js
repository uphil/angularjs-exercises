'use strict';

(function(app) {

    function findJobIndex(list, job) {
        var index = list.findIndex(function(x) {
            return x.id === job.id;
        });

        return index;
    }

    app.filter('findJobIndex', [function() {
                                    return findJobIndex;
                                }]);

})(swimlane);
