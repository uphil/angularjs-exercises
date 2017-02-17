var app = angular.module('calculator', []);

app.controller('CalculatorController', [function() {

    // something here..

}]);

app.directive('calculatorWidget', ['CalculatorService',
function(CalculatorService) {
    return {
        templateUrl: 'templates/calculator.html',
        restrict: 'AE',
        link: function(scope, element, attr) {
            // var id = attr.id;

            scope.numberButtons = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
            scope.operatorButtons = {
                add: {
                    label: '+',
                    op: '+'
                },
                substract: {
                    label: '-',
                    op: '-'
                },
                multiply: {
                    label: 'X',
                    op: '*'
                },
                divide: {
                    label: '/',
                    op: '/'
                }
            };

            scope.appendOperator = function(operator) {
                var expression = scope.expression;

                scope.expression = (typeof expression !== 'undefined') ?
                            expression + operator : '';
            };

            scope.appendNumber = function(number) {
                var expression = scope.expression;

                scope.expression = (typeof expression !== 'undefined') ?
                             expression + number : '';
            };

            scope.doSquare = function() {
                var expression = scope.expression;

                scope.answer = CalculatorService.square(expression);
                scope.expression = (typeof expression !== 'undefined') ?
                                expression + '^2' : '';
            };

            scope.doCube = function() {
                var expression = scope.expression;

                scope.answer = CalculatorService.cube(expression);
                scope.expression = (typeof expression !== 'undefined') ?
                                expression + '^3' : '';
            };

            scope.calculate = function() {
                scope.answer = CalculatorService.express(scope.expression);
            };

            scope.clear = function() {
                scope.expression = '';
                scope.answer = '';
            };
        }
    };
}]);

app.service('MathService', [MathService]);
app.service('CalculatorService', ['MathService', CalculatorService]);

function MathService() {
    this.add = function() { };

    this.subtract = function() { };

    this.multiply = function(a, b) { return a * b; };

    this.divide = function() { };
}

function CalculatorService(MathService) {
    this.square = function(a) {
        return MathService.multiply(a, a);
    };

    this.cube = function(a) {
        return MathService.multiply(a, MathService.multiply(a, a));
    };

    this.express = function(expression) {
        var output = '';

        try {
            output = new Function('return ' + expression);

            return output();
        } catch(e) {
            output = 'Malformed Expression';
        }

        return output;
    };
}
