'use strict';

(function(app) {

    function ticketStatus() {

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
                statuses.indexOf(status) > -1) {

                return status;
            }

            return defaultStatus;
        }

        return normalize;
    }

    app.filter('ticketStatus', [ticketStatus]);

})(swimlane);
