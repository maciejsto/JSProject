angular.module('appController', [])

    .controller('mainController', function($scope, $http,angularService) {
        $scope.formData = {};

        // when landing on the page, get all todos and show them
        
        angularService.get()
            .success(function(data){
                
                $scope.angularData = data
                
            });
    });