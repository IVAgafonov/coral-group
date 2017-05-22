(function () {
    angular.module('pageModule')
        .component('footerComponent', footerComponentFn());

    function footerComponentFn() {
        return {
            templateUrl: 'components/segmentComponent/footerComponent/footerComponent.html',
            controller: footerControllerFn
        }
    }

    function footerControllerFn() {

    }
})();