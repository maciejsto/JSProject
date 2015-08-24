angular.module('arduinoController', [])
	.controller('arduinoController', arduinoController);
	
	arduinoController.$inject = ['$scope', '$http', '$log', 'Socket', '_'];

	
	function arduinoController($scope, $http, $log, Socket, _){
		
		$log.warn("loadede arduino controller")
		
		var vm = this;
		vm.controller = {
	        name: 'arduinoController'
	    }
		vm.result = _.map([1, 2, 3], function(num){ return num * 3; });
	    $log.info(vm.result);
	    
	    
		Socket.emit('arduino:send', {msg: 'message from arduino controller'});
	    Socket.emit('arduino:send2', {msg: ' another message from arduino controller'});
	    Socket.on('server:msg', function(resp){
	    	$scope.temp = resp.data;	
	    });
	    
	    activate();
	    
	    function activate(){
		    $scope.controller = vm.controller;
	    }
		
	}