/**
 * Created by sinukoll on 10/23/2016.
 * services
 */
(function(angular){
    'use strict';
    /* Configuration for intercepting the http calls */
    function customconfig($httpProvider){  };

    angular
        .module('cs5331')
        .config(['$httpProvider',customconfig])
})(window.angular);
