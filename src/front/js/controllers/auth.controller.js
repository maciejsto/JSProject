angular.module('authController', [])

    .controller('authController', authController);
    
    authController.$inject = ['$scope', '$http', '$log', 'Socket', '_'];

    
    function authController($scope, $http,$log, Socket, _) {
        $log.info('loaded auth controller');
        
        var vm = this;
        vm.controller = {
            name : 'authController'
        }
        activate();
        
        function activate(){
            $scope.controller = vm.controller;
        }
    }