angular.module('logoutController', [])


    .controller('logoutController', logoutController);
    
    logoutController.$inject = ['$scope', '$http', '$log', 'Socket', '_'];
    
    
    function logoutController($scope, $http, $log, Socket, _){
        $log.info('loaded logout controller');
        
        var vm = this;
        
        vm.controller = {
            name : 'logoutController'
        }
        
        activate();
        
        function activate(){
        
            $scope.controller = vm.controller;
        }
            
    }