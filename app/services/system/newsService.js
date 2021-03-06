(function () {
    'use strict';
    angular.module('systemModule')
        .service('newsService', ['$http', function($http) {
            return {
                get: function(tags) {
                    if (tags) {
                        return $http({
                            method: 'GET',
                            url: '/api/v1/news/get',
                            params: {
                                tags: tags
                            }
                        });
                    } else {
                        return $http({
                            method: 'GET',
                            url: '/api/v1/news/get'
                        });
                    }

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
                    if (idNews) {
                        return $http({
                            method: 'GET',
                            url: '/api/v1/news/image?idNews=' + idNews
                        });
                    } else {
                        return $http({
                            method: 'GET',
                            url: '/api/v1/news/image'
                        });
                    }

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
                },
                getTagsLinks: function() {
                    return $http({
                        method: 'GET',
                        url: '/api/v1/news/tagslinks/'
                    });
                },
                changeTagsLinks: function(news_id, tag_id, active) {
                    return $http({
                        url: '/api/v1/news/tagslinks',
                        method: 'POST',
                        data: {
                            news_id: news_id,
                            tag_id: tag_id,
                            active: active
                        }
                    });
                },
                deleteBackground: function(id) {
                    return $http({
                        url: '/api/v1/news/background',
                        method: 'DELETE',
                        data: {
                            id: id
                        }
                    });
                }
            };
        }]);
})();