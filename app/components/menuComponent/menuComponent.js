(function () {
    angular.module('pageModule')
        .component('menuComponent', menuComponentFn());

    function menuComponentFn() {
        return {
            templateUrl: 'components/menuComponent/menuComponent.html',
            controller: ['$rootScope', 'menuService', menuControllerFn]
        }
    }

    function menuControllerFn($rootScope, menuService) {

    }
})();