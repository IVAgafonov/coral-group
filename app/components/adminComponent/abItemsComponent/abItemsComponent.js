(function () {
    angular.module('pageModule')
        .component('abItemsComponent', mpItemsComponentFn());

    function mpItemsComponentFn() {
        return {
            templateUrl: 'components/adminComponent/abItemsComponent/abItemsComponent.html',
            controller:  ['abitemsService', '$timeout', abItemsControllerFn]
        }
    }

    function abItemsControllerFn(abitemsService, $timeout) {
        var vm = this;

        vm.messageText = '';
        vm.messageType = '';


        vm.item = {};

        vm.loadElements = function() {
            abitemsService.getItems().then(function(response) {
                vm.items = response.data;
            }, function(error) {

            });
        };

        vm.deleteImage = function(item) {
            abitemsService.deleteItemsImage(item.id).then(function(response) {
                if (response.data.status && response.data.status == 'ok') {
                    item.image = '';
                }
            }, function(error) {

            })
        };

        vm.editItem = function(item) {
            vm.item.itemTemplate = item.template_year;
            vm.item.descTemplate = item.template_desc;
        };

        vm.saveItem = function() {
            abitemsService.saveItem(vm.item.itemTemplate, vm.item.descTemplate).then(function(response) {
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
            abitemsService.sortItems(vm.items).then(function(response) {
                vm.loadElements();
            }, function(error) {

            });
        };

        vm.deleteItem = function(id) {
            abitemsService.deleteItem(id).then(function(response) {
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

        vm.changeActive = function(item) {
            abitemsService.setActive(item).then(function(response) {
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