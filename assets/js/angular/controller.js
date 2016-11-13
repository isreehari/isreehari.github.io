/**
 * Created by sinukoll on 10/23/2016.
 * controller
 */

(function (angular) {
    'use strict';
    function MainController($scope,wordFrequency) {
        var vm = this;
        vm.wikinewsData = [];
        vm.top50Words = [];
        vm.filter = {
          range: {
						minYear: 2004,
						maxYear: 2015
					},
          startYear: 2004,
          endYear: 2005
        };
        vm.wordFrequencyGrapData = [];
        vm.sourceFiles = [
          { name: "WikiNews", filePath: "data/wikinews.json" },
          { name: "Huffington Post", filePath: "data/huffington.json" }
        ];
        vm.selectedFile = "data/wikinews.json";

        vm.nvd3WordFrequencyGrap = {
          options:{},
          data:[

          ],
        }
        vm.nvd3WordFrequencyGrap.options = {
          chart: {
              type: 'stackedAreaChart',
              height: 450,
              margin : {
                  top: 20,
                  right: 20,
                  bottom: 30,
                  left: 40
              },
              x: function(d){return d[0];},
              y: function(d){return d[1];},
              useVoronoi: false,
              clipEdge: true,
              duration: 100,
              useInteractiveGuideline: true,
              dispatch: {
                  stateChange: function(e){ console.log("stateChange"); },
                  changeState: function(e){ console.log("changeState"); },
                  tooltipShow: function(e){ console.log("tooltipShow"); },
                  tooltipHide: function(e){ console.log("tooltipHide"); }
              },
              xAxis: {
                  showMaxMin: false,
                  tickFormat: function(d) {
                      return d3.time.format('%b-%Y')(new Date(d))
                  }
              },
              yAxis: {
                  tickFormat: function(d){
                      return d3.format(',.2f')(d);
                  }
              },
              zoom: {
                  enabled: true,
                  scaleExtent: [1, 10],
                  useFixedDomain: false,
                  useNiceScale: false,
                  horizontalOff: false,
                  verticalOff: true,
                  unzoomEventType: 'dblclick.zoom'
              }
          },
            title: {
                enable: true,
                text: 'Word Frequency'
            },
            subtitle: {
                enable: false,
                text: 'Word Frequency',
                css: {
                    'text-align': 'center',
                    'margin': '10px 13px 0px 7px'
                }
            },
            caption: {
                enable: false,
                html: '',
                css: {
                    'text-align': 'justify',
                    'margin': '10px 13px 0px 7px'
                }
            }
        };
        // get the word frequency from service
        vm.getWordFrequency = function(){
          wordFrequency.getWordFrequency(vm.selectedFile).then(function (returnedData) {
            vm.wikinewsData = returnedData;
            vm.top50Words = vm.getTop50Words();
          });
        };
        vm.resetWordFrequency = function(){
          vm.top50Words = [];
          vm.wikinewsData = [];
        };
        vm.getWordFrequency();
        vm.changeYear = function(){
          $scope.$apply(function (){
              vm.top50Words = [];
              vm.nvd3WordFrequencyGrap.data = [];
          });
          var top50Words = vm.getTop50Words();
          $scope.$apply(function (){
                vm.top50Words = top50Words;
          });

        }
        vm.getTop50Words = function(){
          var tempTop50Words = [];
          var top50Words = [];
          var top50WordsCount = [];
          angular.forEach(vm.wikinewsData,function(tempVal,tempKey){
            var count = 0;
            for(var tempYear = vm.filter.startYear; tempYear <= vm.filter.endYear; tempYear++ ){
              for(var tempMonth=1;tempMonth<=12;tempMonth++){
                   var month = tempYear+'_'+tempMonth;
                   if(vm.wikinewsData[tempKey][month]){
                     count = count + vm.wikinewsData[tempKey][month];
                   }
              }
            }
            tempTop50Words.push([tempKey,count]);
          });
          tempTop50Words.sort(function(a,b){
            return d3.descending(a[1],b[1]);
          });
          for(var i = 0 ; i<= 49; i++){
             top50Words.push(tempTop50Words[i][0]);
             top50WordsCount[tempTop50Words[i][0]] = tempTop50Words[i][1];
          }
          return {words:top50Words,wordsCount:top50WordsCount};
        };
        // word cloud click function
        vm.myOnClickFunction = function(element){
             var selectedTerm = element.text;
             var selectedColor = element.fill;
             var month = 0;
             var jsObj = null;
             var listMonths = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov"];
             var wordFrequencyGrapData = [];
             var tempDate;
             var parseDate = d3.time.format("%Y-%m-%d").parse
             var formatDate  = d3.time.format("%b-%Y")
             var finalWordFrequency = [];

             //console.log(element);





             for(var tempYear=vm.filter.startYear; tempYear <= vm.filter.endYear; tempYear++){
               for(var tempMonth=1;tempMonth<=12;tempMonth++)
               {
                    month = tempYear+'_'+tempMonth;
                    jsObj = parseDate(tempYear+ '-' +tempMonth + '-' +  '01');
                    if(vm.wikinewsData[selectedTerm][month])
                    {
                      wordFrequencyGrapData.push([jsObj,vm.wikinewsData[selectedTerm][month]]);
                    }
                    else
                      wordFrequencyGrapData.push([jsObj,0]);
               }
             }

              if(vm.nvd3WordFrequencyGrap.data.length>0)
                finalWordFrequency = angular.copy(vm.nvd3WordFrequencyGrap.data);


               finalWordFrequency.push({
                   values: wordFrequencyGrapData,      //values - represents the array of {x,y} data points
                   key: selectedTerm, //key  - the name of the series.
                   color: selectedColor,  //color - optional: choose your own line color.
                   strokeWidth: 2,
                   classed: 'dashed'
                 });

                 console.log(finalWordFrequency);



             $scope.$apply(function () {

                   if(finalWordFrequency.length>1)
                   {

                     vm.nvd3WordFrequencyGrap.data = finalWordFrequency;
                     vm.nvd3WordFrequencyGrap.api.update();
                   }
                   else {
                     vm.nvd3WordFrequencyGrap.data = finalWordFrequency;
                     vm.nvd3WordFrequencyGrap.api.refresh();
                   }

               //vm.wordFrequencyGrapData = vm.wordFrequencyGrapData;
             });


         }
        vm.flotGraphWordFrequency = function(){

          };
  };

  angular
    .module('cs5331')
    .controller('MainController', ['$scope', 'wordFrequency', MainController]);
})(window.angular);
