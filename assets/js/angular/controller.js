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
          endYear: 2015
        };
        vm.wordFrequencyGrapData = [];
        vm.sourceFiles = [
          { name: "WikiNews", filePath: "data/wikinews.json" },
          { name: "Huffington Post", filePath: "data/huffington.json" }
        ];
        vm.selectedFile = "data/wikinews.json";
        // get the word frequency from service
        vm.getWordFrequency = function(){
          vm.top50Words = [];
          wordFrequency.getWordFrequency(vm.filter,vm.selectedFile).then(function (returnedData) {
            vm.wikinewsData = returnedData;
            angular.forEach(vm.wikinewsData.topTerms,function(termVal, termKey){
                vm.top50Words.push(termKey);
            });
          });
        };
        vm.resetWordFrequency = function(){
          vm.top50Words = [];
          vm.wikinewsData = [];
        };
        // word cloud click function
        vm.myOnClickFunction = function(element){
             var selectedTerm = element.text;
             var month = 0;
             var jsObj = null;
             var listMonths = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov"]

             for(var tempYear=vm.filter.startYear; tempYear<=vm.filter.endYear; tempYear++)
             {
               for(var tempMonth=0;tempMonth<12;tempMonth++)
               {
                    month = 12 * (tempYear - vm.filter.startYear) + tempMonth;
                    if(vm.wikinewsData.terms[selectedTerm].hasOwnProperty(month))
                    {
                      jsObj = listMonths[tempMonth] + ' ' + tempYear;
                      vm.wordFrequencyGrapData.push({date:parseDate(jsObj),val:vm.wikinewsData.terms[selectedTerm][month]});
                    }
               }
             }

             console.log(vm.wordFrequencyGrapData);
         }
        vm.flotGraphWordFrequency = function(){

          };
  };

  angular
    .module('cs5331')
    .controller('MainController', ['$scope', 'wordFrequency', MainController]);
})(window.angular);
