// "use strict";

angular.module('appname',[
    
    'ui.router', 
    'ngRoute',
    // 'underscore',
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
    'Session',
    'authResolver',
    'authinterceptor',
    'loginDialog'

    ])
    
    
    
    .config(
      
      function( //$stateProvider,
                $routeProvider,
                $urlRouterProvider,
                $locationProvider, 
                $httpProvider, 
                USER_ROLES) {

//     // use the HTML5 History API
        $locationProvider.html5Mode({
          enabled: true,
          // requireBase: false
        });
     

      // $urlRouterProvider.otherwise('/api/login');
      
      
     
      $httpProvider.interceptors.push([
        '$injector',
        function ($injector) {
          return $injector.get('authinterceptor');
        }
      ]);
      $httpProvider.interceptors.push('authinterceptor');
             
             
             
//       // $httpProvider.interceptors.push(function ($timeout, $q, $injector) {
//         // console.log('inside interceptor');
//       // });
      
      
//       // For any unmatched url, send to 404
//       // Now set up the states
      
      
      $stateProvider
      // $routeProvider
        // .when('/users', {
        .state('users', {
          // url: "/users",
          controller: 'userController',
          templateUrl: "api/views/users.ejs"
        })
        
        // .when('/api/index', {
        .state('index', {
          // url: "/index",
          templateUrl: 'views/index.ejs',
          controller: 'indexController',
          // authenticate: true,
          // data: {
          //   authorizedRoles: [USER_ROLES.admin, USER_ROLES.editor]
          // },
          //   resolve: {
          //   auth: function resolveAuthentication(AuthResolver) { 
          //     return AuthResolver.resolve();
          //   }
          // },
        })
        // .when('/home', {
        .state('home', {
          // url: "/home",
          controller: 'homeController',
          templateUrl: "views/home.ejs",
         
        })
        // .when('/about', {
        .state('about', {
          // url: "/about",
          controller: 'aboutController',
          templateUrl: "views/about.ejs"
        })
        // .when('/arduino', {
        .state('arduino', {
          // url: "/arduino",
          controller: 'arduinoController',
          templateUrl: "views/arduino.ejs",
          controllerAs: 'vm',
          
        })
        // .when('/admin', {
        .state('admin', {
          // url: "/admin",
          controller: 'adminController',
          templateUrl: "api/views/admin.ejs"
        })
        // .when('/portfolio', {
        .state('portfolio', {
          // url: "/portfolio",
          controller: 'portfolioController',
          templateUrl: "api/views/portfolio.ejs"
        })
        
        // .when('/logout', {
        .state('logout', {
          // url: "/login",
          templateUrl: "views/logout.ejs",
          controller: 'logoutController'
        })
        // .when('/api/login', {
        .state('login', {
          // url: "/login",
          templateUrl: "views/login.ejs",
          controller: function($scope){
            console.log('fuck')
          }
          // controllerAs: "vm",
          // authenticate: false
          // resolve: {
          //   auth: function resolveAuthentication(AuthResolver) { 
          //     return AuthResolver.resolve();
          //   }
          // },
          
        })
        // .when('/signup', {
        .state('signup', {
          // url: "/signup",
          templateUrl: "views/signup.ejs"
        })
        // .state('404', {
        // // url: '^*path',// no url defined
        // template: 'api/views/404.ejs',
        // })
        // .when('/', {
        .state('/', {
          // url: "/login",
          controller: 'loginController',
          templateUrl: "views/login.ejs"
        })
        
        .otherwise('/api/login');
        
        
        // $urlRouterProvider.otherwise(function($injector, $location){
// 
            // var state = $injector.get('$state');
            // state.go('404');
            // return $location.path();
        // })
     
        
        }) // end of config 
       
       // route for the home page

        
        
        
        
        
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
        
      
      .run(function ($rootScope, $state, $interval, authenticationSvc) {
        
        
          var lastDigestRun = Date.now();
          var idleCheck = $interval(function() {
              var now = Date.now();            
              if (now - lastDigestRun > 30*1*1000) {
                 // logout
                 $state.go("logout");
              }
          }, 1*1000);
      
          $rootScope.$on('$routeChangeStart', function(evt) {
              lastDigestRun = Date.now();  
          });
        
        
          $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams){
            if (toState.authenticate && ! authenticationSvc.isAuthenticated()){
              // User isn’t authenticated
              $state.go("login");
              event.preventDefault(); 
            }
          });
          
          $rootScope.$on('$stateNotFound',
            function(event, unfoundState, fromState, fromParams){
                console.log(unfoundState.to); // "lazy.state"
                console.log(unfoundState.toParams); // {a:1, b:2}
                console.log(unfoundState.options); // {inherit:false} + default options
            })
        });
    
    

    