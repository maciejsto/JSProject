angular.module('arduinoController', [])
	.controller('arduinoController', arduinoController);
	
	arduinoController.$inject = ['$scope','$window', '$http', '$log', 'Socket', '_'];

	
	function arduinoController($scope, $window, $http, $log, Socket, _){
		
		$log.warn("loadede arduino controller");
		
		var vm = this;
		vm.controller = {
	        name: 'arduinoController'
	    }
		vm.result = _.map([1, 2, 3], function(num){ return num * 3; });
	    $log.info(vm.result);
	    
	    
		Socket.emit('arduino:send', {msg: 'message from arduino controller'});
	    Socket.emit('arduino:send2', {msg: ' another message from arduino controller'});
	    
	    Socket.on('server:msg', function(resp){
	    	var _temp = round_num(resp.data);
	    	
	    	
			var c = _temp.toString().split(".")
	    	
	    	//received fake temperature from server 
	    	$scope.temp0 = c[0];
	    	$scope.temp1 = c[1];
	    });
	    
	    activate();
	    
	    function activate(){
		    $scope.controller = vm.controller;
	    }
	    
	    function round_num(num) {
	    	var number = parseFloat(num);
	    	return Math.round( number * 10 ) / 10;
	    }
		
	}