(function () {
    'use strict';
    angular.module('pageModule')
        .component('aboutComponent', aboutComponentFn());

    function aboutComponentFn() {
        return {
            templateUrl: 'components/aboutComponent/aboutComponent.html',
            controller: ['$rootScope', 'abitemsService', aboutControllerFn]
        }
    }

    function aboutControllerFn($rootScope, abitemsService) {
        var vm = this;
        vm.items = [];
        $rootScope.showHeader = true;

        vm.getItems = function() {
            abitemsService.get().then(function(response){
               vm.items = response.data;
            }, function(error){

            });
        };

        vm.getItems();
    }
})();