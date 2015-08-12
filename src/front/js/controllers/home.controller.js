angular.module('homeController', [])

    .controller('homeController', ['$scope', '$http', 'Socket', function($scope, $http, Socket){
        console.log('loaded home controller');
        
        var controller = {
            name : 'homeController'
        }
        
        $scope.controller = controller;
    }]);