"use strict";

angular.module('appname',[
    
    'ui.router', 
    'underscore',
    'authenticationSvc',
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
    'Session'

    ])
    
    .config(function($stateProvider, $urlRouterProvider,$locationProvider, $httpProvider, USER_ROLES) {

    // use the HTML5 History API
        //$locationProvider.html5Mode(false);
        //$locationProvider.hashPrefix('!');
     

      $urlRouterProvider.otherwise('/api/login');
      
      // For any unmatched url, send to 404
      // Now set up the states
      $stateProvider
        .state('users', {
          url: "/users",
        //   controller: 'userController',
          templateUrl: "api/views/users.ejs"
        })
        
        .state('index', {
          url: "/index",
        //   controller: 'indexController',
          templateUrl: "api/views/home.ejs",
          data: {
             //authorizedRoles: [USER_ROLES.admin, USER_ROLES.editor]
          }
        })
        .state('home', {
          url: "/home",
          // controller: 'homeController',
          templateUrl: "api/views/home.ejs",
         
        })
        
        .state('about', {
          url: "/about",
          // controller: 'aboutController',
          templateUrl: "api/views/about.ejs"
        })
        
        .state('arduino', {
          url: "/arduino",
        //   controller: 'arduinoController',
          templateUrl: "api/views/arduino.ejs"
        })
        
         .state('admin', {
          url: "/admin",
        //   controller: 'adminController',
          templateUrl: "api/views/admin.ejs"
        })
        
         .state('portfolio', {
          url: "/portfolio",
        //   controller: 'portfolioController',
          templateUrl: "api/views/portfolio.ejs"
        })
        
        .state('logout', {
          url: "/login",
          templateUrl: "api/views/logout.ejs",
          // controller: 'logoutController'
        })
        
         .state('login', {
          url: "/login",
        //   controller: 'loginController',
          templateUrl: "api/views/login.ejs"
        })
         .state('signup', {
          url: "/signup",
          templateUrl: "api/views/signup.ejs"
        })
        .state('404', {
        // url: '^*path',// no url defined
        template: 'api/views/404.ejs',
        })
         .state('/', {
          url: "/login",
        //   controller: 'loginController',
          templateUrl: "api/views/login.ejs"
        })
        
        $urlRouterProvider.otherwise(function($injector, $location){

            var state = $injector.get('$state');
            state.go('404');
            return $location.path();
        })
     
        
        })
        .constant('AUTH_EVENTS', {
          loginSuccess: 'auth-login-success',
          loginFailed: 'auth-login-failed',
          logoutSuccess: 'auth-logout-success',
          sessionTimeout: 'auth-session-timeout',
          notAuthenticated: 'auth-not-authenticated',
          notAuthorized: 'auth-not-authorized'
        })
        .constant('USER_ROLES', {
          all: '*',
          admin: 'admin',
          editor: 'editor',
          guest: 'guest'
        })
        .run(["$rootScope", "$location", function($rootScope, $location, authenticationSvc, AUTH_EVENTS) {
          // $rootScope.$on('$stateChangeStart', function (event, next) {
              
          //     console.log(authenticationSvc);
          //     var authorizedRoles = next.data.authorizedRoles;
              
          //     if (!authenticationSvc.isAuthorized(authorizedRoles)) {
          //       event.preventDefault();
          //       if (authenticationSvc.isAuthenticated()) {
          //         // user is not allowed
          //         $rootScope.$broadcast(AUTH_EVENTS.notAuthorized);
          //       } else {
          //         // user is not logged in
          //         $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
          //       }
          //     }
          // });
        }]);
    
    

    