(function (angular) {
    'use strict';
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
    function brushZoom(){
      // constants
      var margin = 20,
          width = 960,
          height = 500,
          color = d3.interpolateRgb("#f77", "#77f");
          return {
                  restrict: 'E',
                  scope: {
                    val: '='
                  },
                  link: function (scope, element, attrs) {
                        // set up initial svg object

                        var margin = {top: 20, right: 20, bottom: 110, left: 40},
                            margin2 = {top: 430, right: 20, bottom: 30, left: 40},
                            width = +width - margin.left - margin.right,
                            height = +height - margin.top - margin.bottom,
                            height2 = +height - margin2.top - margin2.bottom;

                            var svg = d3.select(element[0]).append("svg")
                                .attr("width", width + margin.left + margin.right)
                                .attr("height", height + margin.top + margin.bottom);



                        scope.$watch('val', function (newVal, oldVal){

                          svg.selectAll('*').remove();

                          if (!newVal) {
                                         return;
                                       }

                                       var parseDate = d3.time.format("%b %Y").parse;

                                       var x = d3.time.scale().range([0, width]),
                                           x2 = d3.time.scale().range([0, width]),
                                           y = d3.scale.linear().range([height, 0]),
                                           y2 = d3.scale.linear().range([height2, 0]);

                                       var xAxis = d3.svg.axis().scale(x).orient("bottom"),
                                           xAxis2 = d3.svg.axis().scale(x2).orient("bottom"),
                                           yAxis = d3.svg.axis().scale(y).orient("left");

                                       var brush = d3.svg.brush()
                                           .x(x2)
                                           .on("brush", brushed);

                                       var area = d3.svg.area()
                                           .interpolate("monotone")
                                           .x(function(d) { return x(d.date); })
                                           .y0(height)
                                           .y1(function(d) { return y(d.price); });

                                       var area2 = d3.svg.area()
                                           .interpolate("monotone")
                                           .x(function(d) { return x2(d.date); })
                                           .y0(height2)
                                           .y1(function(d) { return y2(d.price); });



                                       svg.append("defs").append("clipPath")
                                           .attr("id", "clip")
                                         .append("rect")
                                           .attr("width", width)
                                           .attr("height", height);

                                       var focus = svg.append("g")
                                           .attr("class", "focus")
                                           .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

                                       var context = svg.append("g")
                                           .attr("class", "context")
                                           .attr("transform", "translate(" + margin2.left + "," + margin2.top + ")");

                                       var zoom = d3.behavior.zoom()
                                           .on("zoom", draw);
                                       // Add rect cover the zoomed graph and attach zoom event.
                                       var rect = svg.append("svg:rect")
                                           .attr("class", "pane")
                                           .attr("width", width)
                                           .attr("height", height)
                                           .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
                                           .call(zoom);

                                       //d3.csv("sp500.csv", type, function(error, data) {

                                         var data = newVal;
                                         x.domain(d3.extent(data.map(function(d) { return d.date; })));
                                         y.domain([0, d3.max(data.map(function(d) { return d.val; }))]);
                                         x2.domain(x.domain());
                                         y2.domain(y.domain());

                                         // Set up zoom behavior
                                         zoom.x(x);

                                         focus.append("path")
                                             .datum(data)
                                             .attr("class", "area")
                                             .attr("d", area);

                                         focus.append("g")
                                             .attr("class", "x axis")
                                             .attr("transform", "translate(0," + height + ")")
                                             .call(xAxis);

                                         focus.append("g")
                                             .attr("class", "y axis")
                                             .call(yAxis);

                                         context.append("path")
                                             .datum(data)
                                             .attr("class", "area")
                                             .attr("d", area2);

                                         context.append("g")
                                             .attr("class", "x axis")
                                             .attr("transform", "translate(0," + height2 + ")")
                                             .call(xAxis2);

                                         context.append("g")
                                             .attr("class", "x brush")
                                             .call(brush)
                                           .selectAll("rect")
                                             .attr("y", -6)
                                             .attr("height", height2 + 7);
                                      // });

                                       function brushed() {
                                         x.domain(brush.empty() ? x2.domain() : brush.extent());
                                         focus.select(".area").attr("d", area);
                                         focus.select(".x.axis").call(xAxis);
                                         // Reset zoom scale's domain
                                         zoom.x(x);
                                       }

                                       function draw() {
                                         focus.select(".area").attr("d", area);
                                         focus.select(".x.axis").call(xAxis);
                                         // Force changing brush range
                                         brush.extent(x.domain());
                                         svg.select(".brush").call(brush);
                                       }

                                       function type(d) {
                                         d.date = parseDate(d.date);
                                         d.price = +d.price;
                                         return d;
                                       }
                        }); // end of watch
                }
              }


    };
    angular
        .module('cs5331')
        .directive('leftSideBar', [leftSideBar])
        .directive('brushZoom', ['d3',brushZoom])
})(window.angular);
