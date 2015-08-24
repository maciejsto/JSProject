angular.module('aboutController', [])

    .controller('aboutController', aboutController);
    
    aboutController.$inject = ['$scope', '$http', '$log', 'Socket', '_'];
    
    function aboutController($scope, $http, $log, Socket, _) {
        $log.info('loaded about controller');
        var vm = this;
        vm.controller = {
            name: 'aboutController'
        }
        
        activate();
        
        function activate(){
            $scope.controller = vm.controller;
        }
    }
    