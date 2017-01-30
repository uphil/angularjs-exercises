var app = angular.module('calculator', []);

app.controller('CalculatorController', ['CalculatorService',
function(CalculatorService) {
    var self = this;

    self.appendOperator = function(operator) {
        self.expression = (typeof self.expression !== 'undefined') ?
                    self.expression + operator : '';
    };

    self.doSquare = function() {
        self.answer = CalculatorService.square(self.expression);

        self.expression = (typeof self.expression !== 'undefined') ?
                        self.expression + '^2' : '';
    };

    self.doCube = function() {
        self.answer = CalculatorService.cube(self.expression);

        self.expression = (typeof self.expression !== 'undefined') ?
                        self.expression + '^3' : '';
    };

    self.calculate = function() {
        self.answer = CalculatorService.express(self.expression);
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
    }
}
