angular.module('logoutController', [])


    .controller('logoutController', logoutController);
    
    logoutController.$inject = ['$scope','$state','$location',  '$http', '$log', 'Socket', '_'];
    
    
    function logoutController($scope,$state, $location, $http, $log, Socket, _){
        $log.info('loaded logout controller');
        
        var vm = this;
        
        vm.controller = {
            name : 'logoutController'
        }
        
        activate();
        
        function activate(){
        
            $scope.controller = vm.controller;
            // $scope.logout = logout;
        }
        
        $scope.logout = function(){
            console.log('loggin out');
            $state.go('login');
            Session.clear();
            localStorage.clearAll();
            // $location.path('/api/login');
        }
        
        // function logout(){
        //     Session.clear();
        //     localStorage.clearAll();
        //     $location.path('/api/login');
        // }
        
//         app.run(function($rootScope) {
//   var lastDigestRun = new Date();
//   $rootScope.$watch(function detectIdle() {
//     var now = new Date();
//     if (now - lastDigestRun > 10*60*60) {
//       // logout here, like delete cookie, navigate to login ...
//     }
//     lastDigestRun = now;
//   });
// });
            
    }