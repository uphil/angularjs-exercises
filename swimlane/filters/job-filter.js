'use strict';

(function(app) {

    function findJobIndex() {

        function getIndex(list, job) {
            var index = list.findIndex(function(x) {
                return x.id === job.id;
            });

            return index;
        }

        return getIndex;
    }

    app.filter('findJobIndex', [findJobIndex]);

})(swimlane);
