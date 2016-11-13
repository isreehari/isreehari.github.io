/**
 * Created by sinukoll on 10/23/2016.
 * services
 */
(function (angular) {
    'use strict';
    /* Configuration for intercepting the http calls */
    function customconfig($httpProvider) { };
    function wordFrequency($http) {
        var wordFrequency = {};
        wordFrequency.getWordFrequency = function (selectedFile) {
            return $http.get(selectedFile)
                .then(function (returnedData) {
                    var returnObj = calWordFrequency(returnedData.data);
                    return returnObj;
                }).catch(function (response) {
                    return response;
                });
        };
        return wordFrequency;
    };
    function calWordFrequency(returnedData) {
        var sourceList = {};
        var numSource = {};
        var maxCount = {}; // contain the max frequency for 4 categories
        var topTerms = {};

        var terms = new Object();
        var termMaxMax = 1;
        var maximumTerms = 50;

        var minYear = 2004;
        var maxYear = 2015;
        var numMonth = 12 * (maxYear - minYear);
        var list = null;
        var termsMaxMax;
        var searchTerm = "";
        var numberInputTerms = 10;
        angular.forEach(returnedData, function (data, key) {
            data.date = new Date(data.time);
            data.year = data.date.getFullYear();
            data.month = data.year+'_'+data.date.getMonth();

            if (data.year >= minYear && data.year <= maxYear) {
                // Add source to sourceList
                if (!sourceList[data.source])
                    sourceList[data.source] = 1;
                else
                    sourceList[data.source]++;

                    if (data.person != "") {
                        angular.forEach(data.person, function (personObj, personKey) {
                            if (personObj) {
                                personObj = personObj.trim();
                                if (!terms[personObj]) {
                                    terms[personObj] = new Object();
                                    terms[personObj].max = 0;
                                    terms[personObj].maxMonth = -100;
                                    terms[personObj].category = "person";

                                }

                                if (!terms[personObj][data.month])
                                    terms[personObj][data.month] = 1;
                                else {
                                    terms[personObj][data.month]++;
                                    if (terms[personObj][data.month] > terms[personObj].max) {
                                        terms[personObj].max = terms[personObj][data.month];
                                        terms[personObj].maxMonth = data.month;
                                        if (terms[personObj].max > termsMaxMax)
                                            termsMaxMax = terms[personObj].max;
                                    }
                                }
                            } // end of personObj null check

                        });
                    }
                    if (data.location != "" && data.location != 1) {
                        angular.forEach(data.location, function (locationObj, locationKey) {
                            if (locationObj) {
                                locationObj = locationObj.trim();
                                if (!terms[locationObj]) {
                                    terms[locationObj] = new Object();
                                    terms[locationObj].max = 0;
                                    terms[locationObj].maxMonth = -100;
                                    terms[locationObj].category = "location";

                                }

                                if (!terms[locationObj][data.month])
                                    terms[locationObj][data.month] = 1;
                                else {
                                    terms[locationObj][data.month]++;
                                    if (terms[locationObj][data.month] > terms[locationObj].max) {
                                        terms[locationObj].max = terms[locationObj][data.month];
                                        terms[locationObj].maxMonth = data.month;
                                        if (terms[locationObj].max > termsMaxMax)
                                            termsMaxMax = terms[locationObj].max;
                                    }
                                }
                            } // end of locationObj null check

                        });
                    }
                    if (data.organization != "" && data.organization != 1) {
                        angular.forEach(data.organization, function (organizationObj, organizationKey) {
                            if (organizationObj) {
                                organizationObj = organizationObj.trim();
                                if (!terms[organizationObj]) {
                                    terms[organizationObj] = new Object();
                                    terms[organizationObj].max = 0;
                                    terms[organizationObj].maxMonth = -100;
                                    terms[organizationObj].category = "organization";

                                }

                                if (!terms[organizationObj][data.month])
                                    terms[organizationObj][data.month] = 1;
                                else {
                                    terms[organizationObj][data.month]++;
                                    if (terms[organizationObj][data.month] > terms[organizationObj].max) {
                                        terms[organizationObj].max = terms[organizationObj][data.month];
                                        terms[organizationObj].maxMonth = data.month;
                                        if (terms[organizationObj].max > termsMaxMax)
                                            termsMaxMax = terms[organizationObj].max;
                                    }
                                }
                            } // end of organizationObj null check

                        });
                    }
                    if (data.miscellaneous != "" && data.miscellaneous != 1) {
                        angular.forEach(data.miscellaneous, function (miscellaneousObj, miscellaneousKey) {
                            if (miscellaneousObj) {
                                miscellaneousObj = miscellaneousObj.trim();
                                if (!terms[miscellaneousObj]) {
                                    terms[miscellaneousObj] = new Object();
                                    terms[miscellaneousObj].max = 0;
                                    terms[miscellaneousObj].maxMonth = -100;
                                    terms[miscellaneousObj].category = "miscellaneous";

                                }

                                if (!terms[miscellaneousObj][data.month])
                                    terms[miscellaneousObj][data.month] = 1;
                                else {
                                    terms[miscellaneousObj][data.month]++;
                                    if (terms[miscellaneousObj][data.month] > terms[miscellaneousObj].max) {
                                        terms[miscellaneousObj].max = terms[miscellaneousObj][data.month];
                                        terms[miscellaneousObj].maxMonth = data.month;
                                        if (terms[miscellaneousObj].max > termsMaxMax)
                                            termsMaxMax = terms[miscellaneousObj].max;
                                    }
                                }
                            } // end of miscellaneousObj null check

                        });
                    }
            } // end of min & max year


        }); // end of forEach
        //topTerms = getRelationships(returnedData, searchTerm, minYear, maxYear, terms, numberInputTerms, numMonth, maximumTerms);
        return terms;



    }
    function getRelationships(returnedData, searchTerm, minYear, maxYear, terms, numberInputTerms, numMonth, maximumTerms) {
        var data2 = {};
        var selected = {};
        var removeList = {};
        var termArray = [];
        var element = {};
        var maxNet = 0;
        var maxMonth = -1;
        var previous = 0;
        var net;
        var numNode;
        var numNode2;
        var relationship = {};
        var relationshipMaxMax = 0;
        var selectedTerms = {};
        var selectedTermsObj = {};

        data2 = returnedData.filter(function (data, index) {
            if (!searchTerm || searchTerm == "") {
                return data;
            }
            else if (data[searchTerm]) {
                return data;
            }
        });
        if (searchTerm && searchTerm != "") {
            angular.forEach(data2, function (data2Val, data2Key) {
                for (var term1 in data2Val) {
                    if (!selected[term1]) {
                        selected[term1] = {};
                    }
                    else {
                        if (!selected[term1].isSelected) {
                            selected[term1].isSelected = 1;
                        }
                        else {
                            selected[term1].isSelected++;
                        }
                    }
                }
            });
        }
        for (var att in terms) {
            element = {};

            element.term = att;
            if (removeList[element.term] || (searchTerm && searchTerm != "" & !selected[element.term]))
                continue;
            maxNet = 0;
            maxMonth = -1;
            for (var m = 1; m < numMonth; m++) {
                if (terms[att][m]) {
                    previous = 0;
                    if (terms[att][m - 1])
                        previous = terms[att][m - 1];
                    net = (terms[att][m] + 1) / (previous + 1);

                    if (net > maxNet) {
                        maxNet = net;
                        maxMonth = m;
                    }
                }
            }
            element.max = maxNet;
            element.maxMonth = maxMonth;
            element.category = terms[att].category;
            if (element.term == searchTerm) {
                element.max = 10000;
                element.isSearchTerm = 1;
            }
            else if (searchTerm && searchTerm != "" && selected[element.term] && selected[element.term].isSelected) {
                element.max = 5000 + selected[element.term].isSelected;
            }

            termArray.push(element);
        } // end of att in terms for loop
        termArray.sort(function (a, b) {
            if (a.max < b.max) {
                return 1;
            }
            if (a.max > b.max) {
                return -1;
            }
            return 0;
        });
        numberInputTerms = termArray.length;
        // Compute relationship **********************************************************
        numNode = Math.min(100, termArray.length);
        numNode2 = Math.min(numNode * 5, termArray.length);

        for (var i = 0; i < numNode2; i++) {
            selectedTerms[termArray[i].term] = termArray[i].max;
            selectedTermsObj[termArray[i].term] = termArray[i];

        }

        data2.forEach(function (d) {
            var year = d.date.getFullYear();
            if (year >= minYear && year <= maxYear) {
                var m = d.month;
                angular.forEach(d.allTerms, function (term1, term1Key) {
                    term1 = term1.trim();
                    if (selectedTerms[term1.trim()]) {   // if the term is in the selected 100 terms
                        angular.forEach(d.allTerms, function (term2, term2Key) {
                            term2 = term2.trim();
                            if (selectedTerms[term2.trim()]) {   // if the term is in the selected 100 terms
                                if (!relationship[term1 + "__" + term2]) {
                                    relationship[term1 + "__" + term2] = new Object();
                                    relationship[term1 + "__" + term2].max = 1;
                                    relationship[term1 + "__" + term2].maxMonth = m;
                                }
                                if (!relationship[term1 + "__" + term2][m])
                                    relationship[term1 + "__" + term2][m] = 1;
                                else {
                                    relationship[term1 + "__" + term2][m]++;
                                    if (relationship[term1 + "__" + term2][m] > relationship[term1 + "__" + term2].max) {
                                        relationship[term1 + "__" + term2].max = relationship[term1 + "__" + term2][m];
                                        relationship[term1 + "__" + term2].maxMonth = m;

                                        if (relationship[term1 + "__" + term2].max > relationshipMaxMax) // max over time
                                            relationshipMaxMax = relationship[term1 + "__" + term2].max;
                                    }
                                }
                            }
                        });
                    }
                });
            }
        });

        return { termObject: returnedData, terms:terms, termArray: termArray, relationship: relationship, topTerms: selectedTerms,topTermsObj:selectedTermsObj };

    };
    function getLeastFrequencyWord(terms, maximumTerms) { };
    function conceptMAP($http) {
        var conceptMapData = {};
        conceptMapData.getWordFrequency = function (filter) {
            return $http.get("data/concept-map.json")
                .then(function (returnedData) {
                    return returnedData.data;
                }).catch(function (response) {
                    return response;
                });
        };

        return conceptMapData;
    };


    angular
        .module('cs5331')    
        .factory('wordFrequency', ['$http', wordFrequency])
        .factory('conceptMAP', ['$http', conceptMAP])
        .config(['$httpProvider', customconfig]);
})(window.angular);
