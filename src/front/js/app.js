"use strict";

angular.module('appname',[
    'ui.router', 
    'arduinoController',
    'userController',
    'userService'
    
    ])
    .config(function($stateProvider, $locationProvider) {

    // Now set up the states
      $stateProvider
        .state('/api/users', {
          url: "/api/users",
          controller: 'userController',
          templateUrl: "views/users.ejs"
        })
        
        .state('/api/home', {
          url: "/api/home",
          templateUrl: "views/home.ejs"
        })
        
        .state('/api/about', {
          url: "/api/about",
          templateUrl: "views/about.ejs"
        })
        
        .state('/api/arduino', {
          url: "/api/arduino",
          templateUrl: "views/arduino.ejs"
        })
        
         .state('/api/admin', {
          url: "/api/admin",
          templateUrl: "views/admin.ejs"
        })
        
         .state('/api/portfolio', {
          url: "/api/portfolio",
          templateUrl: "views/portfolio.ejs"
        })
        
         .state('/api/logout', {
          url: "/api/logout",
        //   templateUrl: "views/login.ejs",
        // controller: 'logoutController'
        })
        
         // use the HTML5 History API
      $locationProvider.html5Mode(true);
      
        
    })
    
    .controller('mainController', function($scope, $http) {
        $scope.formData = {};
         $scope.pageClass = 'page-users';
         console.log('inside main controller');

        // when landing on the page, get all todos and show them
        $http.get('/api/users')
                .success(function(data) {
                        $scope.users = data;
                        console.log(data)
                })
                .error(function(data) {
                        console.log('Error: ' + data);
                })
                
        // $http.get('/api/logout')
        //   .success(function() {
        //                 console.log('logged out ')
        //         })
        //         .error(function(data) {
        //                 console.log('Error: ' + data);
        //         })
            
    })

    .controller('logoutController', function($scope , $location){
        
        // $scope.logout = function(){
            // console.log('logging out');
            // $location.path('/api/login');
        // }
    })
    
   .run(function($rootScope) {
      $rootScope.name = "Ari Lerner";
    })
    
    
    
    
    