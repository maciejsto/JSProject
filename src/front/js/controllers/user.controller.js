angular.module('userController', [])

	// inject the Todo service factory into our controller
	.controller('userController', ['$scope','$log','$http','Users', 'Socket', function($scope, $log, $http, Users, Socket) {
	
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
		$scope.users = Users.get();	
		$scope.userForm = {username: '', password: ''};
		$scope.userInfo = {};
		// SUBMIT ==================================================================
				
		$scope.submitForm = function(isValid) {

    		// check to make sure the form is completely valid
		    if (isValid) {
		    	this.createUser();
		    	$scope.users = Users.get();	
				// this.getAllUsers();		    	
		    }
	
	    };
		
		
		
		$scope.getAllUsers = function(){
			
			$log.info('fetching all users');
			vm.data  = Users.get();
			$scope.users = vm.data;
			$log.info(vm.data)
		};
		
		
		
		
		// CREATE ==================================================================
		// when submitting the add form, send the text to the node API
		$scope.createUser = function() {

			console.log("created user")
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
						vm.data = data;
						$scope.users = Users.get();
					
					})
					.error(function(data) {
            			 console.log('Error: ' + data);
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
					$scope.users = Users.get();
				})
				.error(function(data) {
                	console.log('Error: ' + data);
            	});
		};
		
		// UPDATE ================================================================== TODO
	}]);