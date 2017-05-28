(function () {
    'use strict';
    angular.module('systemModule')
        .service('vacancyService', ['$http', function($http) {
            return {
                get: function() {
                    return $http({
                        method: 'GET',
                        url: '/api/v1/vacancy/get'
                    });
                },
                getItems: function() {
                    return $http({
                        method: 'GET',
                        url: '/api/v1/vacancy/items'
                    });
                },
                setActive: function(item) {
                    return $http({
                        url: '/api/v1/vacancy/items',
                        method: 'POST',
                        data: {
                            id: item.id,
                            active: item.active
                        }
                    });
                },
                saveItem: function(item) {
                    return $http({
                        url: '/api/v1/vacancy/items',
                        method: 'UPDATE',
                        data: {
                            vacancy_name: item.vacancy_name,
                            date: item.date,
                            locale: item.locale,
                            vacancy_desc: item.vacancy_desc,
                            vacancy_require: item.vacancy_require,
                            vacancy_conditions: item.vacancy_conditions,
                            vacancy_addr: item.vacancy_addr,
                            busy_type: item.busy_type
                        }
                    });
                },
                deleteItem: function(id) {
                    return $http({
                        url: '/api/v1/vacancy/items',
                        method: 'DELETE',
                        data: {
                            id: id
                        }
                    });
                },
                sortItems: function(list) {
                    return $http({
                        url: '/api/v1/vacancy/items',
                        method: 'POST',
                        data: {
                            list: list
                        }
                    });
                }
            };
        }]);
})();