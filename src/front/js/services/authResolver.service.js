angular.module('authResolver' , [])
    .factory('authResolver', function ($q, $rootScope, $state) {
      return {
        resolve: function () {
          console.log('calling resolver')
          var deferred = $q.defer();
          var unwatch = $rootScope.$watch('currentUser', function (currentUser) {
            if (angular.isDefined(currentUser)) {
              if (currentUser) {
                deferred.resolve(currentUser);
              } else {
                deferred.reject();
                console.log('going to state login')
                $state.go('login');
              }
              unwatch();
            }
          });
          return deferred.promise;
        }
      };
    })