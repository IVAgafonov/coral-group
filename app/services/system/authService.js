(function () {
    'use strict';
    angular.module('systemModule')
        .service('authService', ['$http', function ($http) {
            return {
                login: function (login, credential) {
                    return $http({
                        method: 'POST',
                        url: 'http://dev4.agafonov.me/apiv1/index.php/auth/login',
                        data: {
                            login: login,
                            credential: credential
                        }
                    }).then(function(response) {
                            return response.data;
                        }, function (error) {
                            return error;
                        });
                    },
                logout: function () {
                    return $http({
                        method: 'GET',
                        url: 'http://dev4.agafonov.me/apiv1/index.php/auth/logout',
                    }).then(function (response) {
                        return response.data;
                    }, function (error) {
                        return error;
                    });
                },
                check: function () {
                    return $http({
                        method: 'GET',
                        url: 'http://dev4.agafonov.me/apiv1/index.php/auth/check',
                    }).then(function (response) {
                        return response.data;
                    }, function (error) {
                        return error;
                    });
                }
            }
        }]);
})();