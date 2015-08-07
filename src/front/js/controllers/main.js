angular.module('userController', [])

	// inject the Todo service factory into our controller
	.controller('mainController', ['$scope','$http','Users', function($scope, $http, Users) {
		$scope.formData = {};
		$scope.loading = true;

		// GET =====================================================================
		// when landing on the page, get all todos and show them
		// use the service to get all the todos
		Users.get()
			.success(function(data) {
				$scope.users = data;
				$scope.loading = false;
			});

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
	}])
// 	.config(function($routeProvider) {
        
//         $routeProvider

//             .when('/users', {
//                 templateUrl : 'views/users.ejs',
//                 controller  : 'mainController'
//             })
//             .otherwise('/');
//             // route for the home page
            
//             /*
//             .when('/', {
//                 templateUrl : 'pages/home.html',
//                 controller  : 'mainController'
//             })

//             // route for the about page
//             .when('/about', {
//                 templateUrl : 'pages/about.html',
//                 controller  : 'aboutController'
//             })

//             // route for the contact page
//             .when('/contact', {
//                 templateUrl : 'pages/contact.html',
//                 controller  : 'contactController'
//             });
//             */
//     });
        
        /*
        $http.get('/angular')
                .success(function(data) {
                        //$scope.angularData = data;
                        $scope.data = data;
                        console.log(data);
                        
                })
                .error(function(data) {
                        console.log('Error: ' + data);
                });
        
        
        
        // when submitting the add form, send the text to the node API
        $scope.createTodo = function() {
                $http.post('/api/todos', $scope.formData)
                        .success(function(data) {
                                $scope.formData = {}; // clear the form so our user is ready to enter another
                                $scope.todos = data;
                        })
                        .error(function(data) {
                                console.log('Error: ' + data);
                        });
        };

        // delete a todo after checking it
        $scope.deleteTodo = function(id) {
                $http.delete('/api/todos/' + id)
                        .success(function(data) {
                                $scope.todos = data;
                        })
                        .error(function(data) {
                                console.log('Error: ' + data);
                        });
        };
        */
        
/*
    })
    
*/