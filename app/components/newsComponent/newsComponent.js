(function () {
    'use strict';
    angular.module('pageModule')
        .component('newsComponent', newsComponentFn());

    function newsComponentFn() {
        return {
            templateUrl: 'components/newsComponent/newsComponent.html',
            controller: ['$rootScope', newsControllerFn]
        }
    }

    function newsControllerFn($rootScope) {
        $rootScope.showHeader = true;
    }
})();