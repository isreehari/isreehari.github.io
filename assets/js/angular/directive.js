(function (angular) {
    'use strict';    
    function leftSideBar(){
      return {
          restrict: 'E',
          replace:true,
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
    angular
        .module('cs5331')
        .directive('leftSideBar', [leftSideBar])
})(window.angular);
