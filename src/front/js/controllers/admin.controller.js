angular.module('adminController', [])
    
    .controller('adminController', adminController);
    
    adminController.$inject = ['$scope', '$http', '$log', 'Socket', '_'];
    
    
    function adminController($scope, $http, $log, Socket, _) {
        
        $log.info('loaded admin controller');
        var vm = this;
        vm.controller = {
            name: 'adminController'
        }
        
        activate();
    
        function activate(){
            $scope.controller = vm.controller;
        }
    }