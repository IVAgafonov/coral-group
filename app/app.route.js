(function() {
    'use strict';
    angular.module('app.router', ['ui.router', 'pascalprecht.translate'])
        .config(['$stateProvider', '$urlServiceProvider', '$translateProvider', function($stateProvider, $urlServiceProvider, $translateProvider) {
            $urlServiceProvider.rules.otherwise({ state: 'app.main'});

            $stateProvider.state('app', {
                abstract: true,
                url: '/{locale}',
                controller: ['$state', '$stateParams', '$translate', 'translateService', function($state, $stateParams, $translate, translateService) {
                    if (!['ru', 'en'].includes($stateParams.locale)) {
                        $state.go('app.main', {locale: 'ru'});
                    }                  
                    
                    translateService.getTranslate($stateParams.locale).then(function(response) {
                        $translateProvider.translations($stateParams.locale, response);
                        $translate.use($stateParams.locale);
                    }, function(error) {
                       console.log(error); 
                    });
                }]
            });

            $stateProvider.state('app.main', {
               url: '/',
               component: 'mainComponent',
               data: {
                   requiresLogin: false
               }
            });

            $stateProvider.state('app.login', {
                url: '/login',
                component: 'loginComponent',
                data: {
                    requiresLogin: false
                }
            });
            
            $stateProvider.state('app.logout', {
                url: '/logout',
                controller: ['$rootScope', '$state', 'authService', function ($rootScope, $state, authService) {
                    $rootScope.auth = false;
                    authService.logout();
                    $state.go('app.login');
                }]
            });
        
            $stateProvider.state('app.admin', {
                url: '/admin',
                component: 'adminComponent',
                data: {
                    requiresLogin: true
                },
                onEnter: function($state, authService) {
                    authService.check().then(function(response) {
                        if (response.auth != true) {
                            $state.go('app.login');
                        }
                    }, function() {
                        console.log('server made a boo boo');
                        $state.go('app.login');
                    });
                }
            });
        }])
        .run(['$rootScope', '$state', 'authService', '$stateParams',function ($rootScope, $state, authService, $stateParams) {
            if (!$stateParams.locale) {
                
                $state.go('app.main', {locale: 'ru'});
            } else {
                
            }
            $rootScope.$on('$stateChangeStart', function(event, toStart, toParams, fromStart, fromParams) {
                var requiredLogin = toState.data.requiresLogin;
                if (requiredLogin) {
                    authService.check().then(function(response) {
                        if (response.auth == false) {
                            $state.go('app.login');
                        }
                    }, function() {
                        console.log('server made a boo boo');
                        $state.go('app.login');
                    });
                }
            });
        }]);
})();