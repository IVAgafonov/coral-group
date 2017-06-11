(function () {
    'use strict';
    angular.module('systemModule')
        .service('portfolioService', ['$http', function($http) {
            return {
                get: function() {
                    return $http({
                        method: 'GET',
                        url: '/api/v1/portfolio/get'
                    });
                },
                getItems: function() {
                    return $http({
                        method: 'GET',
                        url: '/api/v1/portfolio/items'
                    });
                },
                saveItem: function(item) {
                    return $http({
                        url: '/api/v1/portfolio/items',
                        method: 'UPDATE',
                        data: {
                            item: item
                        }
                    });
                },
                deleteItem: function(id) {
                    return $http({
                        url: '/api/v1/portfolio/items',
                        method: 'DELETE',
                        data: {
                            id: id
                        }
                    });
                },
                sortItems: function(list) {
                    return $http({
                        url: '/api/v1/portfolio/items',
                        method: 'POST',
                        data: {
                            list: list
                        }
                    });
                },
                setActive: function(item) {
                    return $http({
                        url: '/api/v1/portfolio/items',
                        method: 'POST',
                        data: {
                            id: item.id,
                            active: item.active
                        }
                    });
                },
                getImages: function(idPortfolio) {
                    if (idPortfolio) {
                        return $http({
                            method: 'GET',
                            url: '/api/v1/portfolio/image?idPortfolio=' + idPortfolio
                        });
                    } else {
                        return $http({
                            method: 'GET',
                            url: '/api/v1/portfolio/image'
                        });
                    }

                },
                sortImages: function(list) {
                    return $http({
                        url: '/api/v1/portfolio/image',
                        method: 'POST',
                        data: {
                            list: list
                        }
                    });
                },
                setActiveImage: function(item) {
                    return $http({
                        url: '/api/v1/portfolio/image',
                        method: 'POST',
                        data: {
                            id: item.id,
                            active: item.active
                        }
                    });
                },
                deleteImage: function(id) {
                    return $http({
                        url: '/api/v1/portfolio/image',
                        method: 'DELETE',
                        data: {
                            id: id
                        }
                    });
                }
            };
        }]);
})();