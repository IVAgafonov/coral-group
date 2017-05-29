(function () {
    'use strict';
    angular.module('pageModule')
        .component('portfolioComponent', portfolioComponentFn());

    function portfolioComponentFn() {
        return {
            templateUrl: 'components/portfolioComponent/portfolioComponent.html',
            controller: ['$rootScope', portfolioControllerFn]
        }
    }

    function portfolioControllerFn($rootScope) {
        $rootScope.showHeader = true;
    }
})();