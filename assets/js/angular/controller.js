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
						minYear: 2006,
						maxYear: 2015
					},
          startYear: 2006,
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
            console.log("******************************************");
            console.log(vm.wikinewsData.topTerms);
            console.log("******************************************");

            angular.forEach(vm.wikinewsData.topTerms,function(termVal, termKey){
                vm.top50Words.push(termKey);
            });

          });
        };
        // word cloud click function
        vm.myOnClickFunction = function(element){
             var selectedTerm = element.text;
             console.log(vm.wikinewsData.terms[selectedTerm]);
         }
        vm.flotGraphWordFrequency = function(){

          };
  };

  angular
    .module('cs5331')
    .controller('MainController', ['$scope', 'wordFrequency', MainController]);
})(window.angular);
