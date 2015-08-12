"use strict";

angular.module('appname',[
    'ui.router', 
    'underscore',
    'homeController',
    'aboutController',
    'arduinoController',
    'adminController',
    'userController',
    'portfolioController',
    'projectsController',
    'todoController',
    'userService',
    'socketService',
    
    
    
    ])
    .config(function($stateProvider, $urlRouterProvider,$locationProvider) {

// For any unmatched url, send to 404
    // Now set up the states
      $stateProvider
        .state('/api/users', {
          url: "/users",
          controller: 'userController',
          templateUrl: "views/users.ejs"
        })
        
        .state('/api/home', {
          url: "/api/home",
          controller: 'homeController',
          templateUrl: "views/home.ejs"
        })
        
        .state('/api/about', {
          url: "/api/about",
          controller: 'aboutController',
          templateUrl: "views/about.ejs"
        })
        
        .state('/api/arduino', {
          url: "/api/arduino",
          controller: 'arduinoController',
          templateUrl: "views/arduino.ejs"
        })
        
         .state('/api/admin', {
          url: "/api/admin",
          controller: 'adminController',
          templateUrl: "views/admin.ejs"
        })
        
         .state('/api/portfolio', {
          url: "/api/portfolio",
          controller: 'portfolioController',
          templateUrl: "views/portfolio.ejs"
        })
        
         .state('/api/logout', {
          url: "/api/logout",
        //   templateUrl: "views/login.ejs",
        controller: 'logoutController'
        })
        
         .state('/api/login', {
          url: "/api/login",
          templateUrl: "views/login.ejs"
        })
        .state('404', {
        url: '^*path',// no url defined
        template: 'views/404.ejs',
        })
        
        $urlRouterProvider.otherwise(function($injector, $location){
   var state = $injector.get('$state');
   state.go('404');
   return $location.path();
})
         // use the HTML5 History API
     $locationProvider.html5Mode(false);
     
        
    })
    
    .factory('mySocket', function (socketFactory) {
        return socketFactory();
    })
    
    .controller('mainController', function($scope, $http) {
        $scope.formData = {};
         $scope.pageClass = 'page-users';
         console.log('inside main controller');

        // when landing on the page, get all todos and show them
        // $http.get('/api/users')
                // .success(function(data) {
                        // $scope.users = data;
                        // console.log(data)
                // })
                // .error(function(data) {
                        // console.log('Error: ' + data);
                // })
                
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
    
    
    
    
    