angular.module('underscore', [])
    .factory('_', function() {
        return window._; //Underscore must already be loaded on the page
});
