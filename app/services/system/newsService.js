(function () {
    'use strict';
    angular.module('systemModule')
        .service('newsService', ['$http', function($http) {
            return {
                get: function() {
                    return $http({
                        method: 'GET',
                        url: '/api/v1/news/get'
                    });
                },
                getItems: function() {
                    return $http({
                        method: 'GET',
                        url: '/api/v1/news/items'
                    });
                },
                saveItem: function(item) {
                    return $http({
                        url: '/api/v1/news/items',
                        method: 'UPDATE',
                        data: {
                            item: item
                        }
                    });
                },
                deleteItem: function(id) {
                    return $http({
                        url: '/api/v1/news/items',
                        method: 'DELETE',
                        data: {
                            id: id
                        }
                    });
                },
                sortItems: function(list) {
                    return $http({
                        url: '/api/v1/news/items',
                        method: 'POST',
                        data: {
                            list: list
                        }
                    });
                },
                setActive: function(item) {
                    return $http({
                        url: '/api/v1/news/items',
                        method: 'POST',
                        data: {
                            id: item.id,
                            active: item.active
                        }
                    });
                },
                getImages: function(idNews) {
                    return $http({
                        method: 'GET',
                        url: '/api/v1/news/image?idNews=' + idNews
                    });
                },
                sortImages: function(list) {
                    return $http({
                        url: '/api/v1/news/image',
                        method: 'POST',
                        data: {
                            list: list
                        }
                    });
                },
                setActiveImage: function(item) {
                    return $http({
                        url: '/api/v1/news/image',
                        method: 'POST',
                        data: {
                            id: item.id,
                            active: item.active
                        }
                    });
                },
                deleteImage: function(id) {
                    return $http({
                        url: '/api/v1/news/image',
                        method: 'DELETE',
                        data: {
                            id: id
                        }
                    });
                }
            };
        }]);
})();