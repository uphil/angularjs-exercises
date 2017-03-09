'use strict';

(function(app) {

    function droppable(JobService) {
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
                    // console.log('this.classList', this.classList);
                    this.classList.add('over');
                    // console.log("dragover");
                });

                element.on('dragenter', function() {
                    this.classList.add('over');
                    // console.log("dragenter", element[0]);
                });

                element.on('dragleave', function() {
                    this.classList.remove('over');
                    // console.log("dragleave");
                });

                element.on('drop', function(e) {
                    var data = {
                        id:  e.dataTransfer.getData('Text'),
                        status: element.attr('data-status')
                    };

                    this.classList.remove('over');

                    scope.$evalAsync('$$service.update($$data)',
                                    {
                                        "$$service": JobService,
                                        "$$data": data
                                    });

                    console.log('new list', JobService.list());
                });
            }
        };
    }

    app.directive('droppable', ['JobService', droppable]);

})(swimlane);
