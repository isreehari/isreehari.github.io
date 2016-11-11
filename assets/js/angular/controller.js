/**
 * Created by sinukoll on 10/23/2016.
 * controller
 */

(function (angular) {
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
