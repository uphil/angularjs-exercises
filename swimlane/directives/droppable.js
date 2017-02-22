'use strict';

angular.module('app')
.directive('droppable', [function() {
    return {
        scope: {
            drop: '&'
        },
        controller: 'JobController',
        controllerAs: 'jobCtrl',
        link: function(scope, element) {
            element.on('dragover', function(e) {
                e.dataTransfer.dropEffect = 'move';
                e.preventDefault();

                this.classList.add('over');
                // console.log("dragover");
            });

            element.on('dragenter', function(e) {
                this.classList.add('over');
                // console.log("dragenter");
            });

            element.on('dragleave', function(e) {
                this.classList.remove('over');
                // console.log("dragleave");
            });

            element.on('drop', function(e) {
                var id = e.dataTransfer.getData('Text'),
                    job = angular.element(document.querySelector('.job-'+id))[0];

                this.classList.remove('over');
                this.appendChild(job);

                // console.log('drop');
            });
        }
    };
}]);
