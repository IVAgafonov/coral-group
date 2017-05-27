(function () {
    'use strict';
    angular.module('systemModule')
        .service('newstagsService', ['$http', function($http) {
            return {
                get: function() {
                    return $http({
                        method: 'GET',
                        url: '/api/v1/newstags/get'
                    });
                },
                getItems: function() {
                    return $http({
                        method: 'GET',
                        url: '/api/v1/newstags/items'
                    });
                },
                saveItem: function(tag_template) {
                    return $http({
                        url: '/api/v1/newstags/items',
                        method: 'UPDATE',
                        data: {
                            tag_template: tag_template,
                        }
                    });
                },
                deleteItem: function(id) {
                    return $http({
                        url: '/api/v1/newstags/items',
                        method: 'DELETE',
                        data: {
                            id: id
                        }
                    });
                },
                sortItems: function(list) {
                    return $http({
                        url: '/api/v1/newstags/items',
                        method: 'POST',
                        data: {
                            list: list
                        }
                    });
                }
            };
        }]);
})();