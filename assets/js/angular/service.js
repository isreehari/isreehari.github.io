/**
 * Created by sinukoll on 10/23/2016.
 * services
 */
(function (angular) {
    'use strict';
    /* Configuration for intercepting the http calls */
    function customconfig($httpProvider) { };

    /* Local json data service */
    function termService($q, $http) {
        var _this = this;

        this.getData = function () {
            return $http({
                url: "/data/wikinews.json"
            }).then(function (returnedData) {
                return returnedData.data;
            });


            // $http.get("/data/wikinews.json")
            //     .success(function (data) {
            //         angular.extend(_this, data);
            //         defer.resolve;
            //     })
            //     .error(function () {
            //         defer.reject("File not found");
            //     });

            // return defer.promise;
        };
    };

    angular
        .module('cs5331')
        .config(['$httpProvider', customconfig])
        .service("termService", ["$q", "$http", termService]);
})(window.angular);
