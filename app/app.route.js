(function() {
    angular.module('app.router', ['ui.router'])
        .config(['$stateProvider', '$urlServiceProvider', function($stateProvider, $urlServiceProvider) {
            $urlServiceProvider.rules.otherwise({ state: 'main'});

            $stateProvider.state('login', {
                url: '/login',
                component: 'loginComponent',
                data: {
                    requiresLogin: false
                }
            });
            
            $stateProvider.state('logout', {
                url: '/logout',
                controller: ['$rootScope', '$state', 'authService', function ($rootScope, $state, authService) {
                    $rootScope.auth = false;
                    authService.logout();
                    $state.go('login');
                }]
            });
        
            $stateProvider.state('admin', {
                url: '/admin',
                component: 'adminComponent',
                data: {
                    requiresLogin: true
                }
            });
        }])
        .run(['$rootScope', '$state', 'authService', function ($rootScope, $state, authService) {
            $rootScope.$on('$stateChangeStart', function(event, toStart, toParams, fromStart, fromParams) {
                var requiredLogin = toState.data.requireLogin;
                
                if (requiredLogin && !authService.check()) {
                    $state.go('login');
                }
            });
        }]);
})();