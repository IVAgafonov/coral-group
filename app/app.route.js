(function() {
    'use strict';
    angular.module('app.router', ['ui.router', 'pascalprecht.translate', 'angularCSS'])
        .config(['$stateProvider', '$urlServiceProvider', '$translateProvider', function($stateProvider, $urlServiceProvider, $translateProvider) {
            $urlServiceProvider.rules.otherwise('/nolang/');

            $translateProvider.useSanitizeValueStrategy('sanitizeParameters');

            $stateProvider.state('app', {
                abstract: true,
                url: '/{locale}',
                controller: ['$rootScope', '$state', '$stateParams', '$translate', 'translateService', '$cookies', 'menuService' ,function($rootScope, $state, $stateParams, $translate, translateService, $cookies, menuService) {
                    var cookiesLocale = $cookies.get('locale');
                    if (!(['ru', 'en'].indexOf($stateParams.locale) !== -1)) {
                        if (!(['ru', 'en'].indexOf(cookiesLocale) !== -1)) {
                            cookiesLocale = 'ru';
                        }
                        $state.go('app.main', {locale: cookiesLocale});
                    }
                    var locale = $stateParams.locale;

                    $cookies.put('locale', locale);
                    $rootScope.locale = locale;
                    menuService.get().then(function(response) {
                        if (!$rootScope.mainMenu || cookiesLocale != locale) {
                            $rootScope.mainMenu = response.data;
                        }
                    }, function(error) {

                    });
                    translateService.get(locale).then(function(response) {
                        $translateProvider.translations(locale, response.data);
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
                },
                onExit: function() {
                    if ($.fn.fullpage.destroy) {
                        $.fn.fullpage.destroy('all');
                    }
                }
            });

            $stateProvider.state('app.news', {
                url: '/news',
                component: 'newsComponent',
                data: {
                    requiresLogin: false
                },
                onExit: function() {
                    $('.owlnews').owlCarousel('destroy');
                    $('.owlnewsimg').owlCarousel('destroy');
                }
            });

            $stateProvider.state('app.about', {
                url: '/about',
                component: 'aboutComponent',
                data: {
                    requiresLogin: false
                }
            });

            $stateProvider.state('app.portfolio', {
                url: '/portfolio',
                component: 'portfolioComponent',
                data: {
                    requiresLogin: false
                },
                onExit: function() {
                    $('.owl').owlCarousel('destroy');
                }
            });

            $stateProvider.state('app.vacancy', {
                url: '/vacancy',
                component: 'vacancyComponent',
                data: {
                    requiresLogin: false
                }
            });

            $stateProvider.state('app.service', {
                url: '/service/{service}',
                component: 'serviceComponent',
                params: {
                    service: {
                        dynamic: true
                    }
                },
                data: {
                    requiresLogin: false
                },
                onExit: function() {
                    if ($.fn.fullpage.destroy) {
                        $.fn.fullpage.destroy('all');
                    }
                }
            });

            $stateProvider.state('app.login', {
                url: '/login',
                component: 'loginComponent',
                data: {
                    requiresLogin: false
                },
                onEnter: ['$css', 'adminCssFile', function($css, adminCssFile) {
                    $css.add('/css/' + adminCssFile);
                }],
                onExit: ['$css', 'adminCssFile', function($css, adminCssFile) {
                    $css.remove('/css/' + adminCssFile);
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
                onEnter: ['$state', 'authService', '$css', 'adminCssFile', function($state, authService, $css, adminCssFile) {
                    authService.check().then(function(response) {
                        if (response.auth != true) {
                            $state.go('app.login');
                        }
                    }, function() {
                        console.log('server made a boo boo');
                        $state.go('app.login');
                    });
                    $css.add('/css/' + adminCssFile);
                }],
                onExit: ['$css', 'adminCssFile', function($css, adminCssFile) {
                    $css.remove('/css/' + adminCssFile);
                }]
            });

            $stateProvider.state('app.admin.translate', {
                url: '/translate',
                component: 'translateComponent'
            });

            $stateProvider.state('app.admin.menus', {
                url: '/menus',
                component: 'menusComponent'
            });

            $stateProvider.state('app.admin.mpitems', {
                url: '/mpitems',
                component: 'mpItemsComponent'
            });

            $stateProvider.state('app.admin.abitems', {
                url: '/abitems',
                component: 'abItemsComponent'
            });

            $stateProvider.state('app.admin.service', {
                url: '/service',
                component: 'serviceAdmComponent'
            });

            $stateProvider.state('app.admin.service.images', {
                url: '/images/{idService}',
                component: 'serviceAdmImagesComponent'
            });

            $stateProvider.state('app.admin.portfolio', {
                url: '/portfolio',
                component: 'portfolioAdmComponent'
            });

            $stateProvider.state('app.admin.portfolio.images', {
                url: '/images/{idPortfolio}',
                component: 'portfolioAdmImagesComponent'
            });

            $stateProvider.state('app.admin.news', {
                url: '/news',
                component: 'newsAdmComponent'
            });

            $stateProvider.state('app.admin.news.images', {
                url: '/images/{idNews}',
                component: 'newsAdmImagesComponent'
            });

            $stateProvider.state('app.admin.vacancy', {
                url: '/vacancy',
                component: 'vacancyAdmComponent'
            });

            $stateProvider.state('app.admin.newstags', {
                url: '/newstags',
                component: 'newsTagsComponent'
            });
        }])
        .run(['$rootScope', function ($rootScope) {

        }]);
})();