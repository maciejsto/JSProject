'use strict';


var appServices = angular.module('appServices', []);
var appControllers = angular.module('appControllers', []);
var appDirectives = angular.module('appDirectives', []);

var options = {};
options.api = {};
options.api.base_url = "http://localhost:3001";



var app = angular.module('jsprojectApp', [
    'ngRoute',
    'appControllers',
    'appServices',
    'appDirectives',
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'btford.socket-io',
    'ui.router',
    'ui.bootstrap',
    'jQuery',
    '_',
    'config'
])

    .config(function ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {
        $urlRouterProvider
            .otherwise('/');

        $locationProvider.html5Mode(true);
        $httpProvider.interceptors.push('authInterceptor');
    })

    .factory('authInterceptor', function ($rootScope, $q, $cookieStore, $location) {
        return {
            // Add authorization token to headers
            request: function (config) {
                config.headers = config.headers || {};
                if ($cookieStore.get('token')) {
                    config.headers.Authorization = 'Bearer ' + $cookieStore.get('token');
                }
                return config;
            },

            // Intercept 401s and redirect you to login
            responseError: function (response) {
                if (response.status === 401) {
                    $location.path('/login');
                    // remove any stale tokens
                    $cookieStore.remove('token');
                    return $q.reject(response);
                }
                else {
                    return $q.reject(response);
                }
            }
        };
    })

    .run(function ($rootScope, $location, Auth) {
        // Redirect to login if route requires auth and you're not logged in
        $rootScope.$on('$stateChangeStart', function (event, next) {
            Auth.isLoggedInAsync(function (loggedIn) {
                if (next.authenticate && !loggedIn) {
                    $location.path('/login');
                }
            });
        });
    });
    
    /*
    
    angular.module('myApp', ['myApp.filters', 'myApp.services', 'myApp.directives']).
  config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider.
      when('/', {
        templateUrl: 'partials/index',
        controller: IndexCtrl
      }).
      when('/addPost', {
        templateUrl: 'partials/addPost',
        controller: AddPostCtrl
      }).
      when('/readPost/:id', {
        templateUrl: 'partials/readPost',
        controller: ReadPostCtrl
      }).
      when('/editPost/:id', {
        templateUrl: 'partials/editPost',
        controller: EditPostCtrl
      }).
      when('/deletePost/:id', {
        templateUrl: 'partials/deletePost',
        controller: DeletePostCtrl
      }).
      otherwise({
        redirectTo: '/'
      });
    $locationProvider.html5Mode(true);
  }]);
  
  */