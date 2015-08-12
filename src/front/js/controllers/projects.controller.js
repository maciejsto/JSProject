angular.module('projectsController', [])

    .controller('projectsController', ['$scope', '$http', 'Socket', function($scope, $http, Socket){
        console.log('loaded projects controller');
        
        var controller = {
            name : 'projectsController'
        }
        
        $scope.controller = controller;
    }]);