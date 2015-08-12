angular.module('userService', [])

	// super simple service
	// each function returns a promise object 
	.factory('Users', ['$http',function($http) {
		
		var store = {
			users: []
		}
		
		return {
			get : function() {
				return $http.get('/api/users').then(function (resp) {
						angular.copy(resp.data, store.users);
						return store.users;
					});
			},
			create : function(userData) {
				return $http.post('/api/users', userData);
			},
			delete : function(id) {
				return $http.delete('/api/users/' + id);
			}
		}
	}]);