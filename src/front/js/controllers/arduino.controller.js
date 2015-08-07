angular.module('arduinoController', [])

	.controller('arduinoController', ['$scope','$http', function($scope, $http) {
	    
	    console.log("loadede arduino controller")
	    var controller = {
	        name: 'arduinoController'
	    }
	    
	    $scope.controller = controller;
	}]);