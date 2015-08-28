// (function () {
//     'use strict';
 
//     angular
//         .module('loginController')
//         .controller('loginController', LoginController);
 
//     LoginController.$inject = ['$location', 'AuthenticationService', 'FlashService'];
//     function loginController($location, AuthenticationService, FlashService) {
//         var vm = this;
 
//         vm.login = login;
 
//         (function initController() {
//             // reset login status
//             AuthenticationService.ClearCredentials();
//         })();
 
//         function login() {
//             vm.dataLoading = true;
//             AuthenticationService.Login(vm.username, vm.password, function (response) {
//                 if (response.success) {
//                     AuthenticationService.SetCredentials(vm.username, vm.password);
//                     $location.path('/');
//                 } else {
//                     FlashService.Error(response.message);
//                     vm.dataLoading = false;
//                 }
//             });
//         };
//     }
 
// })();

angular.module('loginController', [])

	.controller('loginController', loginController);
	
	
	loginController.$inject = ['$scope','$rootScope','$location','$window', '$http', '$log', 'Socket','authenticationSvc', '_', 'AUTH_EVENTS','USER_ROLES'];
	
	function loginController($scope,$rootScope, $location, $window, $http, $log, Socket, authenticationSvc, _, AUTH_EVENTS, USER_ROLES){
		
	    $log.info("loadede login controller")
	    
	    var vm = this;
	    vm.controller = {
	        name: 'loginController'
	    }
	    
	    activate();
	    
	    console.log(AUTH_EVENTS.loginSuccess);
	    
	    
	    
	 
	    
	    
	    
	    
	    
	    
	    
	    
	    // Socket.emit('login:send', {msg: 'message from arduino controller'});
	    
	    function activate(){
		    $scope.name = "login ctrl ";
		    $scope.controller = vm.controller;
		    $scope.click = function(){
		    	$log.info('clicking button in login view');
		    }
	    }
	    
	    
	    $scope.userInfo = null;
	 //   $scope.login = function () {
	 //       authenticationSvc.login($scope.username, $scope.password)
	 //           .then(function (result) {
	 //               $scope.userInfo = result;
	 //               $location.path("/api/home");
	 //           }, function (error) {
	 //               $window.alert("Invalid credentials");
	 //               console.log(error);
	 //           });
		// };
			
		$scope.login = function () {
		    authenticationSvc.login($scope.username, $scope.password).then(function (user) {
		      $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
		      $scope.setCurrentUser(user);
		    }, function () {
		      $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
		    });
		};	
			
		
		$scope.logout = function(){
			Session.clear();
			localStorage.clearAll();
			$window.location.reload();
		}	
			
	    $scope.cancel = function () {
	        $scope.username = "";
	        $scope.password = "";
	    };
	    
	    
	    
	}