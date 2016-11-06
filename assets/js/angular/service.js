/**
 * Created by sinukoll on 10/23/2016.
 * services
 */
(function (angular) {
    'use strict';
    /* Configuration for intercepting the http calls */
    function customconfig($httpProvider) { };

    // /* Local json data service */
    // function mostFrequentTermsService($resource) {
    //     return $resource("/data/mostfrequentterms.json");
    // };

    angular
        .module('cs5331')//, ["ngResource"]
        .config(['$httpProvider', customconfig]);
    // .factory("mostFrequentTermsService", ["$resource", mostFrequentTermsService]);
})(window.angular);
