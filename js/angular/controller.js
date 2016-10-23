/**
 * Created by sinukoll on 6/1/15.
 * controller
 */

(function(angular){
    'use strict';
    function fad_main_ctrl($scope,getData){

        var vm = this;
        vm.returnData = {};

        vm.d3graph = {
					range: {
						min: 2005,
						max: 2015
					},
					startyear: 2005,
					endyear: 2015,
				};

        vm.inputPrefix = {'LA':'Local Area','ST':'State'};
        vm.inputMeasureCode = {'03':'Unemployment Rate', '04':'Unemployment', '05':'Employment', '06':'Labor force'};
        vm.inputSeasonalCode = {'S':'Seasonally','U':'Not Seasonally Adjusted'};
        vm.inputYear = [];
              for(var i=1978;i<=2016;i++)
              vm.inputYear.push(i);
        vm.inputMonth = { 'M01':'January',
                          'M02':'February',
                          'M03':'March',
                          'M04':'April',
                          'M05':'May',
                          'M06':'June',
                          'M07':'July',
                          'M08':'August',
                          'M09':'September',
                          'M10':'October',
                          'M11':'November',
                          'M12':'December',
                          };
        vm.inputState = [
                          {id:'01', name:	'Alabama',code:'AL'},
                          {id:'02', name:	'Alaska',code:'AK'},
                          {id:'04', name:	'Arizona',code:'AZ'},
                          {id:'05', name:	'Arkansas',code:'AR'},
                          {id:'06', name:	'California',code:'CA'},
                          {id:'08', name:	'Colorado',code:'CO'},
                          {id:'09', name:	'Connecticut',code:'CT'},
                          {id:'10', name:	'Delaware',code:'DE'},
                          {id:'11', name:	'District of Columbia',code:'DC'},
                          {id:'12', name:	'Florida',code:'FL'},
                          {id:'13', name:	'Georgia',code:'GA'},
                          {id:'15', name:	'Hawaii',code:'HI'},
                          {id:'16', name:	'Idaho',code:'ID'},
                          {id:'17', name:	'Illinois',code:'IL'},
                          {id:'18', name:	'Indiana',code:'IN'},
                          {id:'19', name:	'Iowa',code:'IA'},
                          {id:'20', name:	'Kansas',code:'KS'},
                          {id:'21', name:	'Kentucky',code:'KY'},
                          {id:'22', name:	'Louisiana',code:'LA'},
                          {id:'23', name:	'Maine',code:'ME'},
                          {id:'24', name:	'Maryland',code:'MD'},
                          {id:'25', name:	'Massachusetts',code:'MA'},
                          {id:'26', name:	'Michigan',code:'MI'},
                          {id:'27', name:	'Minnesota',code:'MN'},
                          {id:'28', name:	'Mississippi',code:'MS'},
                          {id:'29', name:	'Missouri',code:'MO'},
                          {id:'30', name:	'Montana',code:'MT'},
                          {id:'31', name:	'Nebraska',code:'NE'},
                          {id:'32', name:	'Nevada',code:'NV'},
                          {id:'33', name:	'New Hampshire',code:'NH'},
                          {id:'34', name:	'New Jersey',code:'NJ'},
                          {id:'35', name:	'New Mexico',code:'NM'},
                          {id:'36', name:	'New York',code:'NY'},
                          {id:'37', name:	'North Carolina',code:'NC'},
                          {id:'38', name:	'North Dakota',code:'ND'},
                          {id:'39', name:	'Ohio',code:'OH'},
                          {id:'40', name:	'Oklahoma',code:'OK'},
                          {id:'41', name:	'Oregon',code:'OR'},
                          {id:'42', name:	'Pennsylvania',code:'PA'},
                          {id:'44', name:	'Rhode Island',code:'RI'},
                          {id:'45', name:	'South Carolina',code:'SC'},
                          {id:'46', name:	'South Dakota',code:'SD'},
                          {id:'47', name:	'Tennessee',code:'TN'},
                          {id:'48', name:	'Texas',code:'TX'},
                          {id:'49', name:	'Utah',code:'UT'},
                          {id:'50', name:	'Vermont',code:'VT'},
                          {id:'51', name:	'Virginia',code:'VA'},
                          {id:'53', name:	'Washington',code:'WA'},
                          {id:'54', name:	'West Virginia',code:'WV'},
                          {id:'55', name:	'Wisconsin',code:'WI'},
                      //    {id:'56', name:	'Wyoming',code:'WY'},
                        //  {id:'72', name:	'Puerto Rico',code:''},
                        //  {id:'80', name:	'Census Regions and Divisions',code:''},
        ];
        vm.userSelection = {
          prefix:'LA',
          seasonalCode:'U',
          areaType:'ST',
          stateCode:'',
          areaCode:'00000000000',
          measureCode:'03',
          year:'',
          minYear:'2005',
          maxYear:'2015',
          period:''
        };
        vm.requestData ={
          'seriesid': ['LEU0254555900'],
          'startyear': 2005,
          'endyear': 2015
        };
        $scope.mapObject = {
                              scope: 'usa',
                              responsive: true,

                              options: {
                                width: 1110,
                                legendHeight: 60, // optionally set the padding for the legend
                                labels:true,
                              },
                              geographyConfig: {
                                highlighBorderColor: '#EAA9A8',
                                highlighBorderWidth: 3,
                                popupTemplate: function(geography, data) {
                                 return ' <div class="hoverinfo">' + geography.properties.name + ' <br> Unemployment Rate:' +  data.unemploymentRate + ' ';
                               },
                              },
                              fills: {
                                'HIGH': '#CC4731',
                                'MEDIUM': '#306596',
                                'LOW': '#667FAF',
                                'defaultFill': '#DDDDDD',
                                'AL': '#b15542',
                                'AK': '#561a3c',
                                'AZ': '#97cc54',
                                'AR': '#084f14',
                                'CA': '#0edd72',
                                'CO': '#e1f89a',
                                'CT': '#e0557a',
                                'DE': '#91dfb8',
                                'DC': '#63c9bb',
                                'FL': '#8cc430',
                                'GA': '#731270',
                                'HI': '#732bcb',
                                'ID': '#656bfd',
                                'IL': '#656bfd',
                                'IN': '#87408a',
                                'IA': '#b715fe',
                                'KS': '#79bb16',
                                'KY': '#6594af',
                                'LA': '#debeb4',
                                'ME': '#40007a',
                                'MD': '#f4f07e',
                                'MA': '#caac81',
                                'MI': '#e0041b',
                                'MN': '#98d5bf',
                                'MS': '#29bc9f',
                                'MO': '#252a37',
                                'MT': '#76c43c',
                                'NE': '#ce62cc',
                                'NV': '#39ce2d',
                                'NH': '#51e4a8',
                                'NJ': '#681c87',
                                'NM': '#628d93',
                                'NY': '#9e3eb4',
                                'NC': '#7ba5fa',
                                'ND': '#c33050',
                                'OH': '#742a7d',
                                'OK': '#f710c9',
                                'OR': '#db6fe9',
                                'PA': '#b8976c',
                                'RI': '#07e96c',
                                'SC': '#161a56',
                                'SD': '#6a9ffe',
                                'TN': '#17db28',
                                'TX': '#e9cb11',
                                'UT': '#3e9701',
                                'VT': '#66ccc4',
                                'VA': '#7f0780',
                                'WA': '#c06bfc',
                                'WV': '#3e9701',
                                'WI': '#3417b2',
                              },

                            };
        vm.nvd3 = {
          options:{},
          data:[],
        }
        vm.nvd3.options = {
            chart: {
                type: 'lineChart',
                height: 450,
                margin : {
                    top: 20,
                    right: 20,
                    bottom: 40,
                    left: 55
                },
                x: function(d){ return d.x; },
                y: function(d){ return d.y; },
                useInteractiveGuideline: true,
                deepWatchData: false,
                dispatch: {
                    stateChange: function(e){ console.log("stateChange"); },
                    changeState: function(e){ console.log("changeState"); },
                    tooltipShow: function(e){ console.log("tooltipShow"); },
                    tooltipHide: function(e){ console.log("tooltipHide"); }
                },
                xAxis: {
                    axisLabel: 'Years'
                },
                yAxis: {
                    axisLabel: 'Unemployment Rate',
                    tickFormat: function(d){
                        return d3.format('.02f')(d);
                    },
                    axisLabelDistance: -10
                },
                callback: function(chart){
                    console.log("!!! lineChart callback !!!");
                },
                refreshDataOnly:true,

            },
            title: {
                enable: true,
                text: 'Unemployment Line Chart'
            },
            subtitle: {
                enable: false,
                text: 'Subtitle for simple line chart. Lorem ipsum dolor sit amet, at eam blandit sadipscing, vim adhuc sanctus disputando ex, cu usu affert alienum urbanitas.',
                css: {
                    'text-align': 'center',
                    'margin': '10px 13px 0px 7px'
                }
            },
            caption: {
                enable: false,
                html: '',
                css: {
                    'text-align': 'justify',
                    'margin': '10px 13px 0px 7px'
                }
            }
        };
        $scope.updateActiveGeography = function(geography){
          console.log(geography.id);
        }
        $scope.mapObject.data ={};
        vm.getJson = function(){

          var userRequestedData = generateSeriesId(vm);

            if(userRequestedData)
               vm.requestData.seriesid = userRequestedData;
            getData.getAPIData(vm.requestData).then(function(returnedData){
                 vm.returnData = angular.fromJson(returnedData);
                 vm.generateCountryMap();
                 vm.generateSeriesLineChart();
              });

        };
        getData.getAPIData().then(function(returnedData){
             vm.returnData = angular.fromJson(returnedData);
             vm.generateCountryMap();
             vm.generateSeriesLineChart();
            });
        vm.generateCountryMap = function(){
          var stateCode = '';
          var unemploymentRate = 0;
          $scope.mapObject.data ={} ;
           angular.forEach(vm.returnData.Results.series,function(seriesValue,seriesKey){
                stateCode = getStateId(vm.inputState,seriesValue.seriesID,false);
                unemploymentRate = getNationalAvg(seriesValue.data,vm.d3graph);
                $scope.mapObject.data[stateCode] = {"fillKey":stateCode,"unemploymentRate":unemploymentRate};
           });
        };
        vm.generateSeriesLineChart = function(d3graph){
            vm.nvd3.api.updateWithData(generateSeriesLineChartData(vm.inputState,vm.returnData.Results.series,vm.d3graph,$scope.mapObject.fills));
        };
        vm.d3graphUpdate = function(){
          vm.generateCountryMap();
          vm.generateSeriesLineChart();
        };
        // Testing Data
        vm.salesData=[
                        {hour: 1,sales: 54},
                        {hour: 2,sales: 66},
                        {hour: 3,sales: 77},
                        {hour: 4,sales: 70},
                        {hour: 5,sales: 60},
                        {hour: 6,sales: 63},
                        {hour: 7,sales: 55},
                        {hour: 8,sales: 47},
                        {hour: 9,sales: 55},
                        {hour: 10,sales: 30}
                    ];
        $scope.demo2 = {
					range: {
						min: 1978,
						max: 2015
					},
					minYear: 2005,
					maxYear: 2015,
				};

    };
    function generateSeriesId(vm){
      /*************************************************************
                            1         2
                   12345678901234567890
      Series ID    LAUCN281070000000003
      Positions   Value          Field Name
      1-2         LA             Prefix
      3           U              Seasonal Adjustment Code
      4-5         CN             Area Type Code
      6-18        2810700000000  Area Code
      19-20       03             Measure Code
      -------------------------- * -----------------------------------
      Measure Code
      -----------------
      06 Labor force,
      05 Employment,
      04 Unemployment, and
      03 Unemployment rate.
      -------------------------- * -----------------------------------

      LA U CN 28 1070 0000000 03
      LA U ST 01 0000 0000000 03


      ****************************************************************/

      var seriesIds = [];
      var seriesId = '';

      if(vm.userSelection.stateCode =="")
      {
         angular.forEach(vm.inputState,function(tempVal,tempKey){
           seriesId = vm.userSelection.prefix +  vm.userSelection.seasonalCode + vm.userSelection.areaType +  tempVal.id + vm.userSelection.areaCode + vm.userSelection.measureCode;
           seriesIds.push(seriesId);
         });


      }
      else {
        seriesId = vm.userSelection.prefix +  vm.userSelection.seasonalCode + vm.userSelection.areaType +  vm.userSelection.stateCode + vm.userSelection.areaCode + vm.userSelection.measureCode;
        seriesIds.push(seriesId);
      }



      return seriesIds;

    }
    function getStateId(inputState,seriesID,returnObj){
      var stateID = seriesID[5]+seriesID[6];
      var stateCode = '';
      var stateObj = {};
       angular.forEach(inputState,function(tempVal,tempKey){
                   if(tempVal.id == stateID)
                   {
                     stateCode = tempVal.code;
                     stateObj = tempVal;
                      return false;
                   }


       });

       if(returnObj)
        return stateObj;
        else
        return stateCode;
    }
    function getNationalAvg(seriesData,d3graph){
      var numberYears = 1;
      var numberMonths = 1;
      var yearTotal = 0;
      var startYear = d3graph.startyear * 1;
      var endYear = d3graph.endyear * 1;
      var currentYear = 1;
      angular.forEach(seriesData,function(yearVal,yearKey){
                currentYear = yearVal.year * 1;
                if(startYear <= currentYear &&  currentYear <= endYear)
                {
                  yearTotal = yearTotal + yearVal.value*1;
                  numberYears++;
                }

       });
      return parseFloat(Math.round((yearTotal/numberYears) * 100) / 100).toFixed(2);;
    }
    function getNationalAvgYear(seriesData,d3graph){
      var numberYears = 1;
      var numberMonths = 1;
      var yearTotal = 0;
      var startYear = d3graph.startyear * 1;
      var endYear = d3graph.endyear * 1;
      var currentYear = 1;
      var calYearAvg = [];
      var yearAvg = [];
      var tempCal = 0;

      angular.forEach(seriesData,function(seriesVal,seriesKey){
        angular.forEach(seriesVal.data,function(yearVal,yearKey){
                  currentYear = yearVal.year * 1;
                  if(startYear <= currentYear &&  currentYear <= endYear)
                  {

                    if(calYearAvg[currentYear])
                    {
                    calYearAvg[currentYear] = calYearAvg[currentYear] + yearVal.value*1;
                    }
                    else {
                        calYearAvg[currentYear] = yearVal.value*1;

                    }
                  //  yearTotal = yearTotal + yearVal.value*1;
                    numberYears++;

                  }

         });

      });

        angular.forEach(calYearAvg,function(yearVal,yearKey) {
          tempCal =  calYearAvg[yearKey]/50;
          tempCal =  tempCal/12;
          calYearAvg[yearKey] = parseFloat(Math.round(tempCal * 100) / 100).toFixed(2);
        });

      return calYearAvg;
    }
    function generateSeriesLineChartData(inputState,seriesData,d3graph,stateColor){
      var numberYears = 1;
      var numberMonths = 1;
      var yearTotal = 0;
      var startYear = d3graph.startyear * 1;
      var endYear = d3graph.endyear * 1;
      var currentYear = 1;
      var statesUnempRate = [];
      var statesUnempRateSeries = [];
      var statesUnempRateYear = [];
      var statesUnempRateYearFormate = [];

      var statesUnempRateYearFormate = getNationalAvgYear(seriesData,d3graph);


      var stateObj = {};


       angular.forEach(seriesData,function(seriesDataVal,seriesDataKey){
                 statesUnempRateYear = [];
                 statesUnempRateYearFormate = [];
                 angular.forEach(seriesDataVal.data,function(yearDataVal,yearDataKey){
                           currentYear = yearDataVal.year * 1;
                           if(startYear <= currentYear &&  currentYear <= endYear)
                           {
                             if(statesUnempRateYear.indexOf(currentYear) == -1)
                               statesUnempRateYear[currentYear] = yearDataVal.value*1;
                               else
                               statesUnempRateYear[currentYear] = statesUnempRateYear[yearDataVal.year] + yearDataVal.value*1;
                           }

                  });

                  angular.forEach(statesUnempRateYear,function(yearDataVal,yearDataKey){
                       statesUnempRateYearFormate.push({x:yearDataKey, y: yearDataVal});
                  });

             statesUnempRateSeries.push({seriesID:seriesDataVal.seriesID,data:statesUnempRateYearFormate});

        });




        angular.forEach(statesUnempRateSeries,function(seriesDataVal,seriesDataKey){
            stateObj = getStateId(inputState,seriesDataVal.seriesID,true);
          statesUnempRate.push({
              values: seriesDataVal.data,      //values - represents the array of {x,y} data points
              key: stateObj.name, //key  - the name of the series.
              color: stateColor[stateObj.code],  //color - optional: choose your own line color.
              strokeWidth: 2,
              classed: 'dashed'
            });


        });

     statesUnempRate.push({
         values: statesUnempRateYearFormate,      //values - represents the array of {x,y} data points
         key: "National", //key  - the name of the series.
         color: "#896c7e",  //color - optional: choose your own line color.
         strokeWidth: 3,
         classed: 'dashed'
       });



    //  console.log(statesUnempRateYearFormate);




       return statesUnempRate;

    };

    angular
        .module('hari_app')
        .controller('hariMainCtrl',['$scope','getData',fad_main_ctrl])
})(window.angular);
