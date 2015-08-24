angular.module('homeController', [])

    .controller('homeController', homeController);
    
    homeController.$inject = ['$scope', '$http', '$log', 'Socket'];
    
    
    function homeController($scope, $http, $log, Socket){
        $log.info('loaded home controller');
        
        var vm = this;
        vm.controller = {
            name : 'homeController'
        }
        
        activate();
        
        function activate(){
            $scope.controller = vm.controller;
        }
    }