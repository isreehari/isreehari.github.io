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

    function wordFrequency($http){
      var wordFrequency = {};
      wordFrequency.getWordFrequency = function(){
        return $http.get("data/wikinews.json")
                    .then(function(returnedData){
                        var returnObj = calWordFrequency(returnedData.data);
                        return returnObj;
                    }).catch(function(response) {
                        return response;
                    });
      };

      return wordFrequency;

    };
    function calWordFrequency(returnedData){
      var sourceList = {};
      var numSource = {};
      var maxCount = {}; // contain the max frequency for 4 categories

      var terms = new Object();
      var termMaxMax = 1;
      var maximumTerms = 50;

      var minYear = 2006;
      var maxYear = 2015;
      var list = null;
      var termMaxMax;

      angular.forEach(returnedData,function(data,key){
            data.date = new Date(data.time);
            data.year = data.date.getFullYear();
            data.month = 12*(data.year - minYear) + data.date.getMonth();

            if (data.year >= minYear && data.year <= maxYear){
                     // Add source to sourceList
                     if (!sourceList[data.source])
                         sourceList[data.source]=1;
                     else
                         sourceList[data.source]++;
              } // end of source list
            if(data.person != ""){
                angular.forEach(data.person,function(personObj,personKey){
                  if(personObj)
                  {
                    personObj = personObj.trim();
                    if(!terms[personObj])
                    {
                      terms[personObj] = new Object();
                      terms[personObj].max = 0;
                      terms[personObj].maxMonth = -100;
                      terms[personObj].category = "person";

                    }

                    if(!terms[personObj][data.month])
                      terms[personObj][data.month] = 1 ;
                      else {
                        terms[personObj][data.month]++;
                        if(terms[personObj][data.month] > terms[personObj][data.month])
                        {
                          terms[personObj].max = terms[personObj][data.month];
                          terms[personObj].maxMonth = data.month;
                          if(terms[personObj].max > termsMaxMax)
                                termsMaxMax = terms[personObj].max;
                        }
                      }
                  } // end of personObj null check

                });
            }
            if(data.location !="" && data.location != 1){
                angular.forEach(data.location,function(locationObj,locationKey){
                  if(locationObj)
                  {
                    locationObj = locationObj.trim();
                    if(!terms[locationObj])
                    {
                      terms[locationObj] = new Object();
                      terms[locationObj].max = 0;
                      terms[locationObj].maxMonth = -100;
                      terms[locationObj].category = "location";

                    }

                    if(!terms[locationObj][data.month])
                      terms[locationObj][data.month] = 1 ;
                      else {
                        terms[locationObj][data.month]++;
                        if(terms[locationObj][data.month] > terms[locationObj][data.month])
                        {
                          terms[locationObj].max = terms[locationObj][data.month];
                          terms[locationObj].maxMonth = data.month;
                          if(terms[locationObj].max > termsMaxMax)
                                termsMaxMax = terms[locationObj].max;
                        }
                      }
                  } // end of locationObj null check

                });
            }
            if(data.organization !="" && data.organization != 1){
                angular.forEach(data.organization,function(organizationObj,organizationKey){
                  if(organizationObj)
                  {
                    organizationObj = organizationObj.trim();
                    if(!terms[organizationObj])
                    {
                      terms[organizationObj] = new Object();
                      terms[organizationObj].max = 0;
                      terms[organizationObj].maxMonth = -100;
                      terms[organizationObj].category = "organization";

                    }

                    if(!terms[organizationObj][data.month])
                      terms[organizationObj][data.month] = 1 ;
                      else {
                        terms[organizationObj][data.month]++;
                        if(terms[organizationObj][data.month] > terms[organizationObj][data.month])
                        {
                          terms[organizationObj].max = terms[organizationObj][data.month];
                          terms[organizationObj].maxMonth = data.month;
                          if(terms[organizationObj].max > termsMaxMax)
                                termsMaxMax = terms[organizationObj].max;
                        }
                      }
                  } // end of organizationObj null check

                });
            }
            if(data.miscellaneous !="" && data.miscellaneous != 1){
                angular.forEach(data.miscellaneous,function(miscellaneousObj,miscellaneousKey){
                  if(miscellaneousObj)
                  {
                    miscellaneousObj = miscellaneousObj.trim();
                    if(!terms[miscellaneousObj])
                    {
                      terms[miscellaneousObj] = new Object();
                      terms[miscellaneousObj].max = 0;
                      terms[miscellaneousObj].maxMonth = -100;
                      terms[miscellaneousObj].category = "miscellaneous";

                    }

                    if(!terms[miscellaneousObj][data.month])
                      terms[miscellaneousObj][data.month] = 1 ;
                      else {
                        terms[miscellaneousObj][data.month]++;
                        if(terms[miscellaneousObj][data.month] > terms[miscellaneousObj][data.month])
                        {
                          terms[miscellaneousObj].max = terms[miscellaneousObj][data.month];
                          terms[miscellaneousObj].maxMonth = data.month;
                          if(terms[miscellaneousObj].max > termsMaxMax)
                                termsMaxMax = terms[miscellaneousObj].max;
                        }
                      }
                  } // end of miscellaneousObj null check

                });
            }

      }); // end of forEach


      return terms;



    }
    function getLeastFrequencyWord(){};

    angular
        .module('cs5331')//, ["ngResource"]
        .factory('wordFrequency',['$http',wordFrequency])
        .config(['$httpProvider', customconfig]);
    // .factory("mostFrequentTermsService", ["$resource", mostFrequentTermsService]);
})(window.angular);
