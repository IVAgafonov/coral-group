(function () {
    'use strict';
    angular.module('systemModule')
        .service('menuService', ['$http', function($http) {
            return {
                getMenu: function(locale) {
                    return $http({
                        url: '/api/v1/menu/get?locale=' + locale,
                        method: 'GET'
                    });
                }
            }
        }]);
})();