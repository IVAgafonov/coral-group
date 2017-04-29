(function () {
    'use strict';
    angular.module('pageModule')
        .component('aboutComponent', aboutComponentFn());

    function aboutComponentFn() {
        return {
            templateUrl: 'components/aboutComponent/aboutComponent.html',
            controller: aboutControllerFn()
        }
    }

    function aboutControllerFn() {

    }
})();