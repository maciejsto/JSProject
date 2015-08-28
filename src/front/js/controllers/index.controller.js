angular.module('indexController', [])

	.controller('indexController', authController);
	
	authController.$inject = ['$scope', '$http', '$log', 'Socket', '_', 'authenticationSvc', 'USER_ROLES'];
	
	
	function authController($scope, $http, $log, Socket, _,authenticationSvc, USER_ROLES){
		
	    $log.info("loadede index controller")
	    
	    var vm = this;
	    vm.controller = {
	        name: 'indexController'
	    }
	    
	    activate();
	    
	       $scope.currentUser = null;
	    $scope.userRoles = USER_ROLES;
	    $scope.isAuthorized = authenticationSvc.isAuthorized;
	    
	    
	    $log.info($scope.currentUser);
	    $log.info($scope.userRoles);
	    $log.info($scope.isAuthorized);
	 
	    $scope.setCurrentUser = function (user) {
	      $scope.currentUser = user;
	    };
	    
	    function activate(){
	    	$scope.controller = vm.controller;
	    }
    }