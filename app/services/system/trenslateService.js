(function () {
    'use strict';
    angular.module('systemModule')
        .service('translateService', ['$http', function($http) {
        return {
            getTranslate: function(locale) {
                return $http({
                   method: 'GET',
                   url: 'http://dev4.agafonov.me/apiv1/index.php/translate/get?locale=' + locale
                }).then(function(response){
                    return response.data;
                }, function(error) {
                    return error;
                });
            }
        };
    }]);
})();