angular.module('service' , [])
    .factory('angService',['$http', function($http){
       return {
           getSampleData: function(){
               return [
                    { name: 'AngularJS Directives', completed: true },
                    { name: 'Data binding', completed: true },
                    { name: '$scope', completed: true },
                    { name: 'Controllers and Modules', completed: true },
                    { name: 'Templates and routes', completed: true },
                    { name: 'Filters and Services', completed: false },
                    { name: 'Get started with Node/ExpressJS', completed: false },
                    { name: 'Setup MongoDB database', completed: false },
                    { name: 'Be awesome!', completed: false },
                ];
           },
           get: function(){
               return $http.get('/angular');
           }
       }
    }]);