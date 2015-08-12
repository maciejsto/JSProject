angular.module('userController', [])

	// inject the Todo service factory into our controller
	.controller('userController', ['$scope','$http','Users', 'Socket', function($scope, $http, Users, Socket) {
		
		console.log('loaded user controller')
		$scope.formData = {};
		$scope.loading = true;
		
		$scope.sortType     = 'name'; // set the default sort type
  		$scope.sortReverse  = false;  // set the default sort order
  		$scope.searchFish   = '';     // set the default search/filter term
  

		var store = {
			users: []
		}
		// GET =====================================================================
		// when landing on the page, get all todos and show them
		// use the service to get all the todos
		// Users.get()
			// .success(function(data) {
				// console.log(data)
				// $scope.users = data;
				// $scope.loading = false;
			// });
		$scope.users = Users.get();	

		// CREATE ==================================================================
		// when submitting the add form, send the text to the node API
		$scope.createUser = function() {

			// validate the formData to make sure that something is there
			// if form is empty, nothing will happen
			if ($scope.formData.text != undefined) {
				$scope.loading = true;

				// call the create function from our service (returns a promise object)
				Users.create($scope.formData)

					// if successful creation, call our get function to get all the new todos
					.success(function(data) {
						$scope.loading = false;
						$scope.formData = {}; // clear the form so our user is ready to enter another
						$scope.users = data; // assign our new list of todos
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
				});
		};
	}]);