angular.module('indexController', [])

	.controller('indexController', authController);
	
	authController.$inject = ['$scope', '$http', '$log', 'Socket', '_'];
	
	
	function authController($scope, $http, $log, Socket, _){
		
	    $log.info("loadede index controller")
	    
	    var vm = this;
	    vm.controller = {
	        name: 'indexController'
	    }
	    
	    activate();
	    
	    function activate(){
	    	$scope.controller = vm.controller;
	    }
    }