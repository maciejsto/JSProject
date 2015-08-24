"use strict";

angular.module('appname',[
    
    'ui.router', 
    'underscore',
    'loginController',
    'homeController',
    'aboutController',
    'arduinoController',
    'adminController',
    'userController',
    'portfolioController',
    'projectsController',
    'signupController',
    'indexController',
    'todoController',
    'userService',
    'socketService',

    ])
    
    .config(function($stateProvider, $urlRouterProvider,$locationProvider) {

      // For any unmatched url, send to 404
      // Now set up the states
      $stateProvider
        .state('/api/users', {
          url: "/api/users",
        //   controller: 'userController',
          templateUrl: "views/users.ejs"
        })
        
        .state('/api/index', {
          url: "/api/index",
        //   controller: 'indexController',
          templateUrl: "views/home.ejs"
        })
        .state('/api/home', {
          url: "/api/home",
        //   controller: 'homeController',
          templateUrl: "views/home.ejs"
        })
        
        .state('/api/about', {
          url: "/api/about/",
        //   controller: 'aboutController',
          templateUrl: "views/about.ejs"
        })
        
        .state('/api/arduino', {
          url: "/api/arduino",
        //   controller: 'arduinoController',
          templateUrl: "views/arduino.ejs"
        })
        
         .state('/api/admin', {
          url: "/api/admin",
        //   controller: 'adminController',
          templateUrl: "views/admin.ejs"
        })
        
         .state('/api/portfolio', {
          url: "/api/portfolio",
        //   controller: 'portfolioController',
          templateUrl: "views/portfolio.ejs"
        })
        
         .state('/api/logout', {
          url: "/api/login",
          templateUrl: "views/login.ejs",
        //   controller: 'logoutController'
        })
        
         .state('/api/login', {
          url: "/api/login",
        //   controller: 'loginController',
          templateUrl: "views/login.ejs"
        })
         .state('/api/signup', {
          url: "/api/signup",
          templateUrl: "views/signup.ejs"
        })
        .state('/api/404', {
        url: '^*path',// no url defined
        template: 'views/404.ejs',
        })
         .state('/api', {
          url: "/api/login",
        //   controller: 'loginController',
          templateUrl: "views/login.ejs"
        })
        
        $urlRouterProvider.otherwise(function($injector, $location){

            var state = $injector.get('$state');
            state.go('404');
            return $location.path();
        })
         // use the HTML5 History API
        $locationProvider.html5Mode(false);
     
        
        })
        .run(function($rootScope) {
            //   $rootScope.name = "Ari Lerner";    //display in home view
        })
    
    
    
    
    