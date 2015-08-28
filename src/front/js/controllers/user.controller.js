angular.module('userController', [])

	// inject the Todo service factory into our controller
	
	.controller('userController', userController);
	
	userController.$inject = ['$scope', '$http', '$log', 'Users', 'Socket','_'];
	
	
	function userController($scope, $http, $log, Users, Socket, _){
		
		$log.info('loaded user controller');
		
		var vm = this;
		vm.data = [];
		vm.store = {
			users: []
		}
		
		$scope.loading = true;
		$scope.sortType     = 'name'; // set the default sort type
  		$scope.sortReverse  = false;  // set the default sort order
  		$scope.searchFish   = '';     // set the default search/filter term
  		
  		// vm._users = Users.getAllUsers();
  		// vm._new_users = vm._users
  		
  		// _.each(vm._users, function(key,value){
  			// console.log(value)
  		// });
  		
		// $scope.users = vm._new_users;
		
		
		$scope.userForm = {username: '', password: ''};
		$scope.userInfo = {};
		// SUBMIT ==================================================================


		activate();
		
		
		
		function activate(){
			return getAllUsers().then(function(){
				$log.info('fetched all users');	
			});
		}
		
				
		$scope.submitForm = function(isValid) {

    		// check to make sure the form is completely valid
		    if (isValid) {
		    	this.createUser();
		    	
		    }
	
	    };
		
		function getAllUsers() {
			
			return Users.getAllUsers().then(function(data){
				vm.data = data;
				$scope.users = vm.data;
				return vm.data;
			});
		};
		
		
		// CREATE ==================================================================
		// when submitting the add form, send the text to the node API
		$scope.createUser = function() {

			// validate the formData to make sure that something is there
			// if form is empty, nothing will happen
			
			
			if ($scope.userForm.username != undefined || $scope.userForm.password != undefined) {
				$scope.loading = true;

				// call the create function from our service (returns a promise object)
				Users.create($scope.user)

					// if successful creation, call our get function to get all the new todos
					.success(function(data) {
						$scope.loading = false;
						$scope.user = {}; // clear the form so our user is ready to enter another
						$scope.users = data; // assign our new list of todos
						$scope.users = Users.getAllUsers()
					
					})
					.error(function(data) {
            			 $log.error('Error: ' + data);
            		});
					
			}
		};

		// DELETE ==================================================================
		// delete a todo after checking it
		$scope.deleteUser = function(id) {
			$scope.loading = true;

			Users.delete(id)
				// if successful creation, call our get function to get all the new todos
				.success(function(data) {
					$scope.loading = false;
					$scope.users = data; // assign our new list of todos
					$scope.users = Users.getAllUsers();
				})
				.error(function(data) {
                	$log.error('Error: ' + data);
            	});
		};
	}
	