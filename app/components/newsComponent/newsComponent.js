(function () {
    'use strict';
    angular.module('pageModule')
        .component('newsComponent', newsComponentFn());

    function newsComponentFn() {
        return {
            templateUrl: 'components/newsComponent/newsComponent.html',
            controller: newsControllerFn()
        }
    }

    function newsControllerFn() {

    }
})();