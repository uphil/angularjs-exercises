'use strict';

(function(app) {

    function replaceSpace() {
        
        function spaceless(text) {
            if (typeof text === 'string' && text) {
                return (text.replace(/\s+/g, '-')).toLowerCase();
            }
        }

        return spaceless;
    }

    app.filter('spaceless', [replaceSpace]);

})(swimlane);
