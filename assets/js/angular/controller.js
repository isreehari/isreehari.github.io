/**
 * Created by sinukoll on 10/23/2016.
 * controller
 */

(function (angular) {
    'use strict';
    function MainController($scope,wordFrequency) {
        var vm = this;
        vm.leftNavFilter = false;
        vm.leftNavFilterShowhide = function(){
          vm.leftNavFilter = !vm.leftNavFilter;
        };
        vm.wikinewsData = [];
        wordFrequency.getWordFrequency().then(function (returnedData) {
          vm.wikinewsData = returnedData;
          console.log("******************************************");
          console.log(vm.wikinewsData);
          console.log("******************************************");
        });


    };

    angular
        .module('cs5331')
        .controller('MainController', ['$scope','wordFrequency', MainController]);
})(window.angular);
