(function () {
    angular.module('pageModule')
        .component('headerComponent', headerComponentFn());

    function headerComponentFn() {
        return {
            templateUrl: 'components/segmentComponent/headerComponent/headerComponent.html',
            controller: headerControllerFn
        }
    }

    function headerControllerFn() {

    }
})();