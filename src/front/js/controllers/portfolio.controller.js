angular.module('portfolioController', [])

    .controller('portfolioController', ['$scope', '$http', 'Socket', function($scope, $http, Socket){
        console.log('loaded portfolio controller');
        
        var controller = {
            name : 'portfolioController'
        }
        
        $scope.controller = controller;
    }]);