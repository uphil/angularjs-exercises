'use strict';

(function(app) {

    function draggable() {
        return {
            restrict: 'A',
            link: function(scope, element) {
                element[0].draggable = true;

                element.on('dragstart', function(e) {
                    e.dataTransfer.effectAllowed = 'move';
                    e.dataTransfer.setData('Text', element.attr('job-id'));
                    this.classList.add('drag');
                    // console.log("dragstart");
                });

                element.on('dragend', function() {
                    this.classList.remove('drag');
                    // console.log("dragend");
                });
            }
        };
    }

    app.directive('draggable', [draggable]);

})(swimlane);
