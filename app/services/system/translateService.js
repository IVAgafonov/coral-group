(function () {
    'use strict';
    angular.module('systemModule')
        .service('translateService', ['$http', function($http) {
        return {
            get: function(locale) {
                return $http({
                    method: 'GET',
                    url: '/api/v1/translate/get?locale=' + locale
                });
            },
            getTranslate: function(locale, is_important, filter) {
                return $http({
                   method: 'GET',
                   url: '/api/v1/translate/translate?locale=' + locale + '&is_important=' + (is_important ? 'true' : '') + '&filter=' + (filter ? filter : '')
                });
            },
            setImportant: function(id, is_important) {
                return $http({
                    url: '/api/v1/translate/translate',
                    method: 'POST',
                    data: {
                        id: id,
                        is_important: is_important
                    }
                });
            },
            saveTranslation: function(template, translate, locale, is_important) {
                return $http({
                    url: '/api/v1/translate/translate',
                    method: 'UPDATE',
                    data: {
                        template: template,
                        translate: translate,
                        locale: locale,
                        is_important: is_important
                    }
                });
            },
            deleteTranslation: function(id) {
                return $http({
                    url: '/api/v1/translate/translate',
                    method: 'DELETE',
                    data: {
                        id: id
                    }
                });
            }
        };
    }]);
})();