'use strict';

angular.module('app')
.directive('draggable', ['JobService', function(JobService) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            element[0].draggable = true;

            element.on('dragstart', function(e) {
                e.dataTransfer.effectAllowed = 'move';
                e.dataTransfer.setData('Text', element.attr('job-id'));
                this.classList.add('drag');
                // console.log("dragstart");
            });

            element.on('dragend', function(e) {
                var id = element.attr('job-id'),
                    status = element.parent().attr('data-status');
                var detail = {
                    status: status
                };

                this.classList.remove('drag');
                // console.log("dragend");

                // update job status
                JobService.update(parseInt(id), detail);

                console.log('new list', JobService.list());
            });
        }
    };
}]);
