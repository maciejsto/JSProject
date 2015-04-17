
    
angular.module('main.controller', [])

    .controller('mainController', function($scope, $http, angService) {
        
        $scope.message = angService.getSampleData()
        
        $scope.todos = ['Item 1', 'Item 2', 'Item 3'];
         
        $scope.addTodo = function () {
                $scope.todos.push($scope.todo);
                $scope.todo = '';
        };
        
        $scope.removeTodo = function (index) {
                $scope.todos.splice(index, 1);
        };
        //$scope.message = "test"
        /*        
        angService.get()
                .success(function(data){
                       $scope.message =JSON.parse(data);
                })
                .error(function(err){
                        console.log(err)
                });
                
        */
        
        $http.get('/angular')
                .success(function(data) {
                        //$scope.angularData = data;
                        $scope.data = data;
                        console.log(data);
                        
                })
                .error(function(data) {
                        console.log('Error: ' + data);
                });
        
        
        /*
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

    })
    .config(function($routeProvider) {
        
        $routeProvider

            .when('/angular', {
                templateUrl : 'views/angular.ejs',
                controller  : 'mainController'
            })
            .otherwise('/');
            // route for the home page
            
            /*
            .when('/', {
                templateUrl : 'pages/home.html',
                controller  : 'mainController'
            })

            // route for the about page
            .when('/about', {
                templateUrl : 'pages/about.html',
                controller  : 'aboutController'
            })

            // route for the contact page
            .when('/contact', {
                templateUrl : 'pages/contact.html',
                controller  : 'contactController'
            });
            */
    });
