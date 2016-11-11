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
                        var svg = d3.select(element[0]).append("svg");
                        var margin = {top: 20, right: 20, bottom: 110, left: 40},
                            margin2 = {top: 430, right: 20, bottom: 30, left: 40},
                            width = +width - margin.left - margin.right,
                            height = +height - margin.top - margin.bottom,
                            height2 = +height - margin2.top - margin2.bottom;

                        scope.$watch('val', function (newVal, oldVal){

                          svg.selectAll('*').remove();

                          if (!newVal) {
                                         return;
                                       }

                          var parseDate = d3.time.format("%b %Y");

                          var x = d3.time.scale().range([0, width]),
                              x2 = d3.time.scale().range([0, width]),
                              y = d3.scale.linear().range([height, 0]),
                              y2 = d3.scale.linear().range([height2, 0]);

                          var xAxis = d3.svg.axis().scale(x).orient("bottom"),
                              xAxis2 = d3.svg.axis().scale(x2).orient("bottom"),
                              yAxis = d3.svg.axis().scale(y).orient("left");

                          var brush = d3.svg.brush().x(x).on("brush end", brushed);

                          var zoom = d3.zoom()
                              .scaleExtent([1, Infinity])
                              .translateExtent([[0, 0], [width, height]])
                              .extent([[0, 0], [width, height]])
                              .on("zoom", zoomed);

                          var area = d3.area()
                              .curve(d3.curveMonotoneX)
                              .x(function(d) { return x(d.date); })
                              .y0(height)
                              .y1(function(d) { return y(d.price); });

                          var area2 = d3.area()
                              .curve(d3.curveMonotoneX)
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

                          // d3.csv("sp500.csv", type, function(error, data) {
                          //   if (error) throw error;



                          data = newVal;


                            x.domain(d3.extent(data, function(d) { return d.date; }));
                            y.domain([0, d3.max(data, function(d) { return d.price; })]);
                            x2.domain(x.domain());
                            y2.domain(y.domain());

                            focus.append("path")
                                .datum(data)
                                .attr("class", "area")
                                .attr("d", area);

                            focus.append("g")
                                .attr("class", "axis axis--x")
                                .attr("transform", "translate(0," + height + ")")
                                .call(xAxis);

                            focus.append("g")
                                .attr("class", "axis axis--y")
                                .call(yAxis);

                            context.append("path")
                                .datum(data)
                                .attr("class", "area")
                                .attr("d", area2);

                            context.append("g")
                                .attr("class", "axis axis--x")
                                .attr("transform", "translate(0," + height2 + ")")
                                .call(xAxis2);

                            context.append("g")
                                .attr("class", "brush")
                                .call(brush)
                                .call(brush.move, x.range());

                            svg.append("rect")
                                .attr("class", "zoom")
                                .attr("width", width)
                                .attr("height", height)
                                .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
                                .call(zoom);
                        //  });

                          function brushed() {
                            if (d3.event.sourceEvent && d3.event.sourceEvent.type === "zoom") return; // ignore brush-by-zoom
                            var s = d3.event.selection || x2.range();
                            x.domain(s.map(x2.invert, x2));
                            focus.select(".area").attr("d", area);
                            focus.select(".axis--x").call(xAxis);
                            svg.select(".zoom").call(zoom.transform, d3.zoomIdentity
                                .scale(width / (s[1] - s[0]))
                                .translate(-s[0], 0));
                          }

                          function zoomed() {
                            if (d3.event.sourceEvent && d3.event.sourceEvent.type === "brush") return; // ignore zoom-by-brush
                            var t = d3.event.transform;
                            x.domain(t.rescaleX(x2).domain());
                            focus.select(".area").attr("d", area);
                            focus.select(".axis--x").call(xAxis);
                            context.select(".brush").call(brush.move, x.range().map(t.invertX, t));
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
