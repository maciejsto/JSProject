angular.module('authController', [])

    .controller('authController', ['$scope', '$http', 'Socket', function($scope, $http, Socket){
        console.log('loaded auth controller');
        
        var controller = {
            name : 'authController'
        }
        
        $scope.controller = controller;
    }]);