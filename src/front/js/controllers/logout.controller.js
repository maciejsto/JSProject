angular.module('logoutController', [])

    .controller('logoutController', ['$scope, $http', 'Socket', function($scope, $http, Socket){
        console.log('loaded logout controller');
        
        var controller = {
            name : 'logoutController'
        }
        
        $scope.controller = controller;
    }]);