var app = angular.module('myApp', ["ngRoute"]);

app.config(function($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl : "views/main.html",
        controller : "mainCtrl"
    })
    .when("/search/:moviename", {
        templateUrl : "views/search.html",
        controller : "searchCtrl"
    })
    .when("/movie/:id", {
        templateUrl : "views/movie.html",
        controller : "movieCtrl"
    });
});

app.controller('mainCtrl', function($scope, $http,$location) {
  $scope.searchmovie = function(moviename){
  	$location.path('/search/:'+moviename);
  }	  
});

app.controller('searchCtrl', function($scope, $http,$location) { 
	$scope.iserror =false;
	$scope.isloading =true;
 	var geturl = $location.path().split(':');
 	$scope.movie = geturl[1];
  	var apiurl = "http://www.omdbapi.com/?s="+$scope.movie;
	  	
	  	$http({
        		method : "GET",
        		url : apiurl
	    }).then(function mySucces(response) {
	        	if(typeof response.data.Search !== 'undefined'){
	        		$scope.iserror =false;
	   				$scope.isloading =false;
	   				$scope.movieresults = response.data.Search;

	        	}
	        	else{
	        		$scope.isloading =false;
	        		$scope.iserror =true;
	        		$scope.error = 'No Results found';
	   			}	
	    }, function myError(response) {
	    		$scope.isloading =false;
	        	$scope.iserror =true;
	        	$scope.error = 'Something Went Wrong Please Try Again Later.';
	    });

	$scope.moviedetails= function(id){
		//console.log("ID" +id);
		$location.path('/movie/:'+id);
	};  	 

	$scope.goBack=function() {
		    window.history.back();
	 } 
});

app.controller('movieCtrl', function($scope, $http,$location) {
	$scope.iserror =false;
	$scope.isloading =true;
 	var geturl = $location.path().split(':');
 	$scope.id = geturl[1];
  	var apiurl = "http://www.omdbapi.com/?i="+$scope.id;
	  	
  		$http({
        		method : "GET",
        		url : apiurl
	    }).then(function mySucces(response) {
	        	if(typeof response.data !== 'undefined'){
					$scope.iserror =false;
					$scope.isloading =false;
	   				$scope.moviedetails = response.data;  
	        	}
	        	else{
	        		$scope.isloading =false;
	        		$scope.iserror =true;
	        		$scope.error = 'No Results found';
	   			}	
	    }, function myError(response) {
	    		$scope.isloading =false;
	        	$scope.iserror =true;
	        	$scope.error = 'Something Went Wrong Please Try Again Later.';
	    });

	 $scope.goBack=function() {
		    window.history.back();
	 }   
});