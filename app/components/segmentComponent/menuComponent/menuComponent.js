(function () {
    angular.module('pageModule')
        .component('menuComponent', menuComponentFn());

    function menuComponentFn() {
        return {
            templateUrl: 'components/segmentComponent/menuComponent/menuComponent.html',
            controller: menuControllerFn
        }
    }

    function menuControllerFn() {

    }
})();