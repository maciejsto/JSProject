angular.module('adminController', [])

    .controller('adminController', ['$scope', '$http', 'Socket', function($scope, $http, Socket){
        console.log('loaded admin controller');
        
        var controller = {
            name : 'adminController'
        }
        
        $scope.controller = controller;
    }]);