(function () {
    'use strict';
    angular.module('pageModule')
        .component('serviceComponent', serviceComponentFn());

    function serviceComponentFn() {
        return {
            templateUrl: 'components/serviceComponent/serviceComponent.html',
            controller: serviceControllerFn()
        }
    }

    function serviceControllerFn() {

    }
})();