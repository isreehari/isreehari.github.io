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
                    testing: '='
                  },
                  link: function (scope, element, attrs) {
                        // set up initial svg object




                        var margin = {top: 10, right: 10, bottom: 100, left: 40},
                            margin2 = {top: 430, right: 10, bottom: 20, left: 40},
                            width = 960 - margin.left - margin.right,
                            height = 500 - margin.top - margin.bottom,
                            height2 = 500 - margin2.top - margin2.bottom;

                            var svg = d3.select("#brushZoom").append("svg")
                                        .attr("width", width + margin.left + margin.right)
                                        .attr("height", height + margin.top + margin.bottom);


                        scope.$watch('testing', function (newVal, oldVal){





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
                                           .y1(function(d) { return y(d.val); });

                                       var area2 = d3.svg.area()
                                           .interpolate("monotone")
                                           .x(function(d) { return x2(d.date); })
                                           .y0(height2)
                                           .y1(function(d) { return y2(d.val); });



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





                                        // console.log(data);



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
                                    //   });

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
                                         d.val = +d.val;
                                         return d;
                                       }
                        }); // end of watch
                }
              }


    };
    function custWordCloud(){
      // constants
      // var margin = 20,
      //     width = 960,
      //     height = 500,
      //     color = d3.interpolateRgb("#f77", "#77f");
      //     return {
      //             restrict: 'E',
      //             scope: {
      //               words: '='
      //             },
      //             link: function (scope, element, attrs) {
      //                   // set up initial svg object
      //                   var margin = {top: 10, right: 10, bottom: 100, left: 40},
      //                       margin2 = {top: 430, right: 10, bottom: 20, left: 40},
      //                       width = 500 - margin.left - margin.right,
      //                       height = 500 - margin.top - margin.bottom,
      //                       height2 = 500 - margin2.top - margin2.bottom;
      //
      //                   var svg = d3.select(element[0])
      //                               .append("svg")
      //                               .attr("width", width + margin.left + margin.right)
      //                               .attr("height", height + margin.top + margin.bottom)
      //                               .attr("transform", "translate(250,250)");
      //
      //                   scope.$watch('words', function (newVal, oldVal){
      //
      //                     var fill = d3.scale.category20();
      //                    //Draw the word cloud
      //                    function draw(words) {
      //                        var cloud = svg1.selectAll("g text").data(words, function(d) { return d.text; })
      //                        var mouse;
      //                        //Entering words
      //                        cloud.enter()
      //                             .append("text")
      //                             .style("font-family", "Impact")
      //                             .attr("val",function(d){return d.text;})
      //                             .style("fill", function(d, i) { return fill(i); })
      //                             .attr("text-anchor", "middle")
      //                             .attr('font-size', 1)
      //                             .text(function(d) { return d.text; })
      //                             .on('mousemove', function(d) {
      //                               mouse = d3.mouse(svg1.node()).map(function(d) { return parseInt(d); });
      //                               var xCordinate=d3.mouse(this)[0]+1200;
      //                               var yCordinate=d3.mouse(this)[1]+500;
      //                              tooltip.classed('hidden', false)
      //                                     .attr('cursor', 'pointer')
      //                                     .attr('style', 'left:' + xCordinate +'px; top:' + yCordinate + 'px')
      //                                     .html("Word:"+d.text+"<br />Frequency:"+Word_frequency[d.text]);
      //                                }).on('mouseout', function() { tooltip.classed('hidden', true); })
      //                             .on("click", clicked);
      //
      //                        //Entering and existing words
      //                        cloud.transition()
      //                             .duration(600)
      //                             .style("font-size", function(d) { return d.size + "px"; })
      //                             .attr("transform", function(d) {
      //                                    return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
      //                                })
      //                                .style("fill-opacity", 1);
      //
      //                        //Exiting words
      //                        cloud.exit()
      //                             .transition()
      //                             .duration(200)
      //                             .style('fill-opacity', 1e-6)
      //                             .attr('font-size', 1)
      //                             .remove();
      //                    }
      //                    return {
      //                        update: function(words) {
      //                            d3.layout.cloud().size([600,600])
      //                              .words(words)
      //                              .padding(5)
      //                              .rotate(function() { return ~~(Math.random() * 2) * 90; })
      //                              .font("Impact")
      //                              .fontSize(function(d) { return d.size; })
      //                              .on("end", draw)
      //                              .start();
      //                        }
      //                    }
      //                   }); // end of watch
      //           }
      //         }
    };

    angular
        .module('cs5331')
        .directive('leftSideBar', [leftSideBar])
        .directive('brushZoom', [brushZoom])        
})(window.angular);
