/**
 * Created by sinukoll on 10/23/2016.
 * controller
 */

(function (angular) {
    'use strict';
    function MainController($scope) {
        var vm = this;
        vm.leftNavFilter = false;
        vm.leftNavFilterShowhide = function(){
          vm.leftNavFilter = !vm.leftNavFilter;
        };
    };

    angular
        .module('cs5331')
        .controller('MainController', ['$scope', MainController]);
})(window.angular);
