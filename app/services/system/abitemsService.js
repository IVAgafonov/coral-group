(function () {
    'use strict';
    angular.module('systemModule')
        .service('abitemsService', ['$http', function($http) {
            return {
                get: function() {
                    return $http({
                        method: 'GET',
                        url: '/api/v1/abitems/get'
                    });
                },
                getItems: function() {
                    return $http({
                        method: 'GET',
                        url: '/api/v1/abitems/items'
                    });
                },
                setActive: function(item) {
                    return $http({
                        url: '/api/v1/abitems/items',
                        method: 'POST',
                        data: {
                            id: item.id,
                            active: item.active
                        }
                    });
                },
                saveItem: function(itemTemplate, descTemplate) {
                    return $http({
                        url: '/api/v1/abitems/items',
                        method: 'UPDATE',
                        data: {
                            itemTemplate: itemTemplate,
                            descTemplate: descTemplate
                        }
                    });
                },
                deleteItem: function(id) {
                    return $http({
                        url: '/api/v1/abitems/items',
                        method: 'DELETE',
                        data: {
                            id: id
                        }
                    });
                },
                sortItems: function(list) {
                    return $http({
                        url: '/api/v1/abitems/items',
                        method: 'POST',
                        data: {
                            list: list
                        }
                    });
                }
            };
        }]);
})();