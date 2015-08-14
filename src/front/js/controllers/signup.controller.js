angular.module('signupController', [])

	.controller('signupController', ['$scope','$http', 'Socket', '_', function($scope, $http, Socket, _) {
		
	    
	   // var result = _.map([1, 2, 3], function(num){ return num * 3; });
	    
	   // console.log(result);
	    
// 		Socket.emit('arduino:send', {msg: 'message from arduino controller'});
	    
	   // Socket.emit('arduino:send2', {msg: ' another message from arduino controller'});
	    
	    console.log("loadede signup controller")
	    var controller = {
	        name: 'signupController'
	    }
	    
	    $scope.controller = controller;
	}]);