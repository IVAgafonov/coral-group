(function () {
    angular.module('pageModule')
        .component('newsTagsComponent', newsTagsComponentFn());

    function newsTagsComponentFn() {
        return {
            templateUrl: 'components/adminComponent/newsTagsComponent/newsTagsComponent.html',
            controller:  ['newstagsService', '$timeout', newsTagsControllerFn]
        }
    }

    function newsTagsControllerFn(newstagsService, $timeout) {
        var vm = this;

        vm.messageText = '';
        vm.messageType = '';


        vm.item = {};

        vm.loadElements = function() {
            newstagsService.getItems().then(function(response) {
                vm.items = response.data;
            }, function(error) {

            });
        };

        vm.editItem = function(item) {
            vm.item.tag_template = item.tag_template;
        };

        vm.saveItem = function() {
            newstagsService.saveItem(vm.item.tag_template).then(function(response) {
                if (response.data.error) {
                    vm.messageType = 'danger';
                    vm.messageText = 'AdmInvalidOperation';
                } else {
                    vm.messageType = 'success';
                    vm.messageText = 'AdmSuccessOperation';
                    vm.loadElements();
                }
            }, function(error) {
                vm.messageType = 'danger';
                vm.messageText = 'AdmInvalidOperation';
            });
            $timeout(function() {
                vm.messageText = '';
            }, 2000);
        };

        vm.sortItems = function() {
            newstagsService.sortItems(vm.items).then(function(response) {
                vm.loadElements();
            }, function(error) {

            });
        };

        vm.deleteItem = function(id) {
            newstagsService.deleteItem(id).then(function(response) {
                if (response.data.error) {
                    vm.messageType = 'danger';
                    vm.messageText = 'AdmInvalidOperation';
                } else {
                    vm.messageType = 'success';
                    vm.messageText = 'AdmSuccessOperation';
                    vm.loadElements();
                }
            }, function(error) {
                vm.messageType = 'danger';
                vm.messageText = 'AdmInvalidOperation';
            });
            $timeout(function() {
                vm.messageText = '';
            }, 2000);
        };

        vm.loadElements();
    }
})();