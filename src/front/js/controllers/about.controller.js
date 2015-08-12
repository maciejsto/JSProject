angular.module('aboutController', [])

    .controller('aboutController', ['$scope', '$http', 'Socket', function($scope, $http, Socket){
        console.log('loaded about controller');
        
        var controller = {
            name : 'aboutController'
        }
        
        $scope.controller = controller;
    }]);