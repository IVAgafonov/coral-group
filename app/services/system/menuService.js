(function () {
    'use strict';
    angular.module('systemModule')
        .service('menuService', ['$http', function($http) {
            return {
                get: function() {
                    return $http({
                        url: '/api/v1/menu/get',
                        method: 'GET'
                    });
                },
                getAsList: function() {
                    return $http({
                        url: '/api/v1/menu/getaslist',
                        method: 'GET'
                    });
                },
                getMenu: function() {
                    return $http({
                        url: '/api/v1/menu/menu',
                        method: 'GET'
                    });
                },
                saveMenu: function(name, uri) {
                    return $http({
                        url: '/api/v1/menu/menu',
                        method: 'UPDATE',
                        data: {
                            name: name,
                            uri: uri,
                        }
                    });
                },
                sortMenu: function(list) {
                    return $http({
                        url: '/api/v1/menu/menu',
                        method: 'POST',
                        data: {
                            list: list
                        }
                    });
                },
                changeActive : function(item) {
                    return $http({
                        url: '/api/v1/menu/menu',
                        method: 'POST',
                        data: {
                            id: item.id,
                            active: item.active
                        }
                    });
                },
                deleteMenu: function(id) {
                    return $http({
                        url: '/api/v1/menu/menu',
                        method: 'DELETE',
                        data: {
                            id: id
                        }
                    });
                }
            }
        }]);
})();