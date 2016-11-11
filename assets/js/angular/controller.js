/**
 * Created by sinukoll on 10/23/2016.
 * controller
 */

(function (angular) {
<<<<<<< HEAD
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
        // get the word frequency from service
        vm.getWordFrequency = function(){
          vm.top50Words = [];
          wordFrequency.getWordFrequency(vm.filter).then(function (returnedData) {
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

=======
  'use strict';
  function MainController($scope, wordFrequency) {
    var vm = this;
    vm.leftNavFilter = false;
    vm.leftNavFilterShowhide = function () {
      vm.leftNavFilter = !vm.leftNavFilter;
    };
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

    $scope.files = [
      { name: "WikiNews", filePath: "data/wikinews.json" },
      { name: "Huffington Post", filePath: "data/huffington.json" }
    ];

    $scope.selectedFile = "data/wikinews.json";
>>>>>>> jsorbo

    vm.filePath = "data/wikinews.json";
    vm.getWordFrequency = function () {
      vm.top50Words = [];
      wordFrequency.getWordFrequency(vm.filter, $scope.selectedFile).then(function (returnedData) {
        vm.wikinewsData = returnedData;
        console.log("******************************************");
        console.log(vm.wikinewsData.topTerms);
        console.log("******************************************");

        angular.forEach(vm.wikinewsData.topTerms, function (termVal, termKey) {
          vm.top50Words.push(termKey);
        });

      });
    };
    vm.myOnClickFunction = function (element) {
      console.log("click", element);
    }

  };

  angular
    .module('cs5331')
    .controller('MainController', ['$scope', 'wordFrequency', MainController]);
})(window.angular);
