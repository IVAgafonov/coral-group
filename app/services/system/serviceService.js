(function () {
    'use strict';
    angular.module('systemModule')
        .service('serviceService', ['$http', function($http) {
            return {
                get: function() {
                    return $http({
                        method: 'GET',
                        url: '/api/v1/service/get'
                    });
                },
                getItems: function() {
                    return $http({
                        method: 'GET',
                        url: '/api/v1/service/items'
                    });
                },
                saveItem: function(item) {
                    return $http({
                        url: '/api/v1/service/items',
                        method: 'UPDATE',
                        data: {
                            item: item
                        }
                    });
                },
                deleteItem: function(id) {
                    return $http({
                        url: '/api/v1/service/items',
                        method: 'DELETE',
                        data: {
                            id: id
                        }
                    });
                },
                sortItems: function(list) {
                    return $http({
                        url: '/api/v1/service/items',
                        method: 'POST',
                        data: {
                            list: list
                        }
                    });
                },
                deleteIcon: function(id) {
                    return $http({
                        url: '/api/v1/service/icon',
                        method: 'DELETE',
                        data: {
                            id: id
                        }
                    });
                },
                deleteBackground: function(idService) {
                    return $http({
                        url: '/api/v1/service/background',
                        method: 'DELETE',
                        data: {
                            idService: idService
                        }
                    });
                },
                getImages: function(idService) {
                    return $http({
                        method: 'GET',
                        url: '/api/v1/service/image?idService=' + idService
                    });
                },
                sortImages: function(list) {
                    return $http({
                        url: '/api/v1/service/image',
                        method: 'POST',
                        data: {
                            list: list
                        }
                    });
                },
                setActiveImage: function(item) {
                    return $http({
                        url: '/api/v1/service/image',
                        method: 'POST',
                        data: {
                            id: item.id,
                            active: item.active
                        }
                    });
                },
                deleteImage: function(id) {
                    return $http({
                        url: '/api/v1/service/image',
                        method: 'DELETE',
                        data: {
                            id: id
                        }
                    });
                }
            };
        }]);
})();