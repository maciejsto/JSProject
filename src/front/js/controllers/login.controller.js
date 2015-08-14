angular.module('loginController', [])

	.controller('loginController', ['$scope','$http', function($scope, $http) {
		
	    
// 		Socket.emit('arduino:send', {msg: 'message from arduino controller'});
	    
	   // Socket.emit('arduino:send2', {msg: ' another message from arduino controller'});
	    
	    console.log("loadede login controller")
	    var controller = {
	        name: 'loginController'
	    }
	    $scope.name = "login ctrl ";
	    $scope.controller = controller;
	    
	    
	    $scope.click = function(){
	    	console.log('clicking button in login view');
	    }
	}]);