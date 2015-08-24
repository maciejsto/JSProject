angular.module('loginController', [])

	.controller('loginController', loginController);
	
	
	loginController.$inject = ['$scope', '$http', '$log', 'Socket', '_'];
	
	function loginController($scope, $http, $log, Socket, _){
		
	    $log.info("loadede login controller")
	    
	    var vm = this;
	    vm.controller = {
	        name: 'loginController'
	    }
	    
	    activate();
	    
	    // Socket.emit('login:send', {msg: 'message from arduino controller'});
	    
	    function activate(){
		    $scope.name = "login ctrl ";
		    $scope.controller = vm.controller;
		    $scope.click = function(){
		    	$log.info('clicking button in login view');
		    }
	    }
	}