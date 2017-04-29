(function() {
    'use strict';
    angular.module('app.router', ['ui.router', 'pascalprecht.translate', 'angularLoad'])
        .config(['$stateProvider', '$urlServiceProvider', '$translateProvider', function($stateProvider, $urlServiceProvider, $translateProvider) {
            $urlServiceProvider.rules.otherwise('/nolang/');

            $stateProvider.state('app', {
                abstract: true,
                url: '/{locale}',
                controller: ['$rootScope', '$state', '$stateParams', '$translate', 'translateService', '$cookies', 'menuService' ,function($rootScope, $state, $stateParams, $translate, translateService, $cookies, menuService) {

                    var cookiesLocale = $cookies.get('locale');
                    if (!['ru', 'en'].includes($stateParams.locale)) {
                        if (!['ru', 'en'].includes(cookiesLocale)) {
                            cookiesLocale = 'ru';
                        }
                        $state.go('app.main', {locale: cookiesLocale});
                    }
                    var locale = $stateParams.locale;

                    $cookies.put('locale', locale);
                    $rootScope.locale = locale;
                    menuService.getMenu($rootScope.locale).then(function(response) {
                        if (!$rootScope.mainMenu || cookiesLocale != locale) {
                            $rootScope.mainMenu = response.data;
                        }
                    }, function(error) {

                    });
                    $translateProvider.useSanitizeValueStrategy('escape');
                    translateService.getTranslate(locale).then(function(response) {
                        $translateProvider.translations(locale, response);
                        $translate.use(locale);
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

            $stateProvider.state('app.news', {
                url: '/news',
                component: 'newsComponent',
                data: {
                    requiresLogin: false
                }
            });

            $stateProvider.state('app.about', {
                url: '/about',
                component: 'aboutComponent',
                data: {
                    requiresLogin: false
                }
            });

            $stateProvider.state('app.service', {
                url: '/service/{name}',
                component: 'serviceComponent',
                data: {
                    requiresLogin: false
                }
            });

            $stateProvider.state('app.login', {
                url: '/login',
                component: 'loginComponent',
                data: {
                    requiresLogin: false
                },
                onEnter: ['angularLoad', 'adminCssFile', function(angularLoad, adminCssFile) {
                    angularLoad.loadCSS('/css/' + adminCssFile).then(function(response) {

                    }, function(error) {

                    });
                }]
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
                onEnter: ['$state', 'authService', 'angularLoad', 'adminCssFile', function($state, authService, angularLoad, adminCssFile) {
                    authService.check().then(function(response) {
                        if (response.auth != true) {
                            $state.go('app.login');
                        }
                    }, function() {
                        console.log('server made a boo boo');
                        $state.go('app.login');
                    });
                    angularLoad.loadCSS('/css/' + adminCssFile).then(function(response) {
                    }, function(error) {
                        
                    });
                }]
            });
        }])
        .run(['$rootScope', '$state', 'authService', function ($rootScope, $state, authService) {

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