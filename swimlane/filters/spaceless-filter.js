'use strict';

(function(app) {

    function spaceless(text) {
        if (typeof text === 'string' && text) {
            return (text.replace(/\s+/g, '-')).toLowerCase();
        }
    }

    app.filter('spaceless', [function() {
                                return spaceless;
                            }]);

})(swimlane);
