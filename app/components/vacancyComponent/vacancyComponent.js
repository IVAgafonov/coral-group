(function () {
    'use strict';
    angular.module('pageModule')
        .component('vacancyComponent', vacancyComponentFn());

    function vacancyComponentFn() {
        return {
            templateUrl: 'components/vacancyComponent/vacancyComponent.html',
            controller: ['$rootScope', vacancyControllerFn]
        }
    }

    function vacancyControllerFn($rootScope) {
        $rootScope.showHeader = true;
    }
})();