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
        vm.top50Words = [];
      //  vm.top50WordsR = false;
        wordFrequency.getWordFrequency().then(function (returnedData) {
          vm.wikinewsData = returnedData;
          console.log("******************************************");
          console.log(vm.wikinewsData.topTerms);
          console.log("******************************************");

          angular.forEach(vm.wikinewsData.topTerms,function(termVal, termKey){
              vm.top50Words.push(termKey);
          });

          //vm.top50Words = ["Hallo","Test","Lorem","Ipsum","Lorem","ipsum","dolor","sit","amet,","consetetur","sadipscing","elitr,","sed","diam","nonumy","eirmod","tempor","invidunt","ut","labore","et","dolore","magna","aliquyam","erat,","sed","diam"];

          //vm.top50WordsR = true;
        });



        vm.myOnClickFunction = function(element){
           console.log("click",element);
       }

    };

    angular
        .module('cs5331')
        .controller('MainController', ['$scope','wordFrequency', MainController]);
})(window.angular);
