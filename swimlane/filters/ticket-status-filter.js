'use strict';

(function(app) {

    function normalize(status) {
        var defaultStatus = 'planned',
            statuses = [
                'planned',
                'working on',
                'resolved',
                'qa tested',
                'completed'
            ];

        if (typeof status === 'string' && status &&
            statuses.indexOf(status.toLowerCase()) > -1) {

            return status;
        }

        return defaultStatus;
    }

    app.filter('ticketStatus', [function() {
                                    return normalize;
                                }]);

})(swimlane);
