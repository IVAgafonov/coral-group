(function () {
    'use strict';
    angular.module('systemModule')
        .service('mpitemsService', ['$http', function($http) {
            return {
                get: function() {
                    return $http({
                        method: 'GET',
                        url: '/api/v1/mpitems/get'
                    });
                },
                getItems: function() {
                    return $http({
                        method: 'GET',
                        url: '/api/v1/mpitems/items'
                    });
                },
                setActive: function(item) {
                    return $http({
                        url: '/api/v1/mpitems/items',
                        method: 'POST',
                        data: {
                            id: item.id,
                            active: item.active
                        }
                    });
                },
                saveItem: function(itemTemplate, menuId) {
                    return $http({
                        url: '/api/v1/mpitems/items',
                        method: 'UPDATE',
                        data: {
                            itemTemplate: itemTemplate,
                            menuId: menuId,
                        }
                    });
                },
                deleteItem: function(id) {
                    return $http({
                        url: '/api/v1/mpitems/items',
                        method: 'DELETE',
                        data: {
                            id: id
                        }
                    });
                },
                sortItems: function(list) {
                    return $http({
                        url: '/api/v1/mpitems/items',
                        method: 'POST',
                        data: {
                            list: list
                        }
                    });
                },
                deleteItemsImage: function(id) {
                    return $http({
                        url: '/api/v1/mpitems/itemsimage',
                        method: 'DELETE',
                        data: {
                            id: id
                        }
                    });
                }
            };
        }]);
})();