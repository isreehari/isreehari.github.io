(function (angular) {
    'use strict';
    function wordCloud($window, termService) {//, mostFrequentTermsService
        return {
            restrict: "EA",
            scope: false,
            template: "<svg width='1200' height='400'></svg>",
            link: function (scope, elem, attrs) {
                var wordData = [];
                var padding = 20;
                var xScale, yScale, xAxisGen, yAxisGen, lineFun;
                var d3 = $window.d3;
                var rawSvg = elem.find('svg');
                var svg = d3.select(rawSvg[0]);

                var frequencyList;

                termService.getData().then(function (data) {
                    scope.termData = data;
                });

                frequencyList = [{
                    "count": 1103,
                    "term": "american"
                },
                {
                    "count": 1035,
                    "term": "australia"
                },
                {
                    "count": 1013,
                    "term": "british"
                },
                {
                    "count": 814,
                    "term": "australian"
                },
                {
                    "count": 772,
                    "term": "iraq"
                },
                {
                    "count": 759,
                    "term": "united kingdom"
                },
                {
                    "count": 681,
                    "term": "china"
                },
                {
                    "count": 653,
                    "term": "canada"
                },
                {
                    "count": 623,
                    "term": "uk"
                },
                {
                    "count": 611,
                    "term": "london"
                },
                {
                    "count": 611,
                    "term": "france"
                },
                {
                    "count": 533,
                    "term": "russia"
                },
                {
                    "count": 526,
                    "term": "europe"
                },
                {
                    "count": 521,
                    "term": "germany"
                },
                {
                    "count": 491,
                    "term": "england"
                },
                {
                    "count": 487,
                    "term": "french"
                },
                {
                    "count": 481,
                    "term": "afghanistan"
                },
                {
                    "count": 474,
                    "term": "israel"
                },
                {
                    "count": 473,
                    "term": "new york"
                },
                {
                    "count": 472,
                    "term": "united nations"
                },
                {
                    "count": 471,
                    "term": "washington"
                },
                {
                    "count": 456,
                    "term": "japan"
                },
                {
                    "count": 452,
                    "term": "wikinews"
                },
                {
                    "count": 451,
                    "term": "iran"
                },
                {
                    "count": 429,
                    "term": "california"
                },
                {
                    "count": 420,
                    "term": "america"
                },
                {
                    "count": 419,
                    "term": "chinese"
                },
                {
                    "count": 416,
                    "term": "bush"
                },
                {
                    "count": 411,
                    "term": "india"
                },
                {
                    "count": 399,
                    "term": ""
                },
                {
                    "count": 393,
                    "term": "barack obama"
                },
                {
                    "count": 387,
                    "term": "white house"
                },
                {
                    "count": 385,
                    "term": "new zealand"
                },
                {
                    "count": 377,
                    "term": "german"
                },
                {
                    "count": 374,
                    "term": "iraqi"
                },
                {
                    "count": 373,
                    "term": "european"
                },
                {
                    "count": 370,
                    "term": "americans"
                },
                {
                    "count": 367,
                    "term": "european union"
                },
                {
                    "count": 366,
                    "term": "britain"
                },
                {
                    "count": 360,
                    "term": "utc"
                },
                {
                    "count": 359,
                    "term": "george w. bush"
                },
                {
                    "count": 357,
                    "term": "bbc"
                },
                {
                    "count": 353,
                    "term": "english"
                },
                {
                    "count": 335,
                    "term": "pakistan"
                },
                {
                    "count": 332,
                    "term": "israeli"
                },
                {
                    "count": 319,
                    "term": "internet"
                },
                {
                    "count": 318,
                    "term": "senate"
                },
                {
                    "count": 317,
                    "term": "spain"
                },
                {
                    "count": 316,
                    "term": "reuters"
                },
                {
                    "count": 301,
                    "term": "italy"
                }];

                var color;

                function setParameters() {
                    color = d3.scale.category20();
                }

                d3.layout.cloud()
                    .size([1200, 400])
                    .words(frequencyList)
                    .rotate(0)
                    .fontSize(function (d) {
                        return d.count;
                    })
                    .on("end", draw)
                    .start();

                function draw(words) {
                    setParameters();

                    svg.attr("class", "wordcloud")
                        .append("g")
                        .selectAll("text")
                        .data(words)
                        .enter().append("text")
                        .style("font-size", function (d) {
                            return d.count / 20 + "px";
                        })
                        .style("fill", function (d, i) {
                            return color(i);
                        })
                        .attr("transform", function (d) {
                            return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
                        })
                        .text(function (d) {
                            return d.term;
                        });
                }
                scope.drawCloud = function () {
                    draw(frequencyList);
                }
            }
        };
    };
    function leftSideBar() {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: 'views/leftnavfilter.html',
            controller: function ($scope, $element) {
                // Function for collapse ibox
                $scope.showhide = function () {
                    var sideBar = $element.closest('div.left-nav-filter');
                    var sideBarWrapper = sideBar.find('div#sidebar-wrapper');
                    // Toggle icon from up to down
                    sideBarWrapper.toggleClass('active');


                };
            }
        };
    };
    angular
        .module('cs5331')
        .directive('wordCloud', ["$window", "termService", wordCloud])
        .directive('leftSideBar', [leftSideBar])
})(window.angular);
