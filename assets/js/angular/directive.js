/**
 * Created by sinukoll on 10/23/2016.
 */

(function (angular) {
    'use strict';

    function wordCloud($window) {
        return {
            restrict: "EA",
            scope: false,
            template: "<svg width='850' height='200'></svg>",
            link: function (scope, elem, attrs) {
                var wordData = [];
                var padding = 20;
                var xScale, yScale, xAxisGen, yAxisGen, lineFun;
                var d3 = $window.d3;
                var rawSvg = elem.find('svg');
                var svg = d3.select(rawSvg[0]);

                function setParameters() {


                }

                function draw() {

                }
            }
        };
    };
    angular
        .module('cs5331')
        .directive('wordCloud', [wordCloud, $window])
})(window.angular);
