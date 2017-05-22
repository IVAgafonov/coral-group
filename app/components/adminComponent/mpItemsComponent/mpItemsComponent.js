(function () {
    angular.module('pageModule')
        .component('mpItemsComponent', mpItemsComponentFn());

    function mpItemsComponentFn() {
        return {
            templateUrl: 'components/adminComponent/mpItemsComponent/mpItemsComponent.html',
            controller:  ['mpitemsService', 'menuService', '$timeout', 'FileUploader', mpItemsControllerFn]
        }
    }

    function mpItemsControllerFn(mpitemsService, menuService, $timeout, FileUploader) {
        var vm = this;

        vm.messageText = '';
        vm.messageType = '';

        vm.menuItemId = 0;

        vm.item = {};

        vm.uploader = new FileUploader({
            url: '/api/v1/mpitems/itemsimage',
            autoUpload: true,
            removeAfterUpload: true
        });

        vm.uploader.onSuccessItem = function (fileItem, response, status, headers) {
            if (response.error) {
                vm.messageType = 'danger';
                vm.messageText = response.error;
                $timeout(function() {
                    vm.messageText = '';
                }, 2000);
            }
            vm.loadElements();
        };

        vm.loadElements = function() {
            menuService.getAsList().then(function(response) {
                vm.menuList = response.data;
            }, function(error) {

            });

            mpitemsService.getItems().then(function(response) {
                vm.items = response.data;
            }, function(error) {

            });
        };

        vm.deleteImage = function(item) {
            mpitemsService.deleteItemsImage(item.id).then(function(response) {
                if (response.data.status && response.data.status == 'ok') {
                    item.image = '';
                }
            }, function(error) {

            })
        };

        vm.editItem = function(item) {
            vm.item.itemTemplate = item.text_template;
            vm.item.menuItemId = item.menu_id;
        };

        vm.saveItem = function() {
            mpitemsService.saveItem(vm.item.itemTemplate, vm.item.menuItemId).then(function(response) {
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
            mpitemsService.sortItems(vm.items).then(function(response) {
                vm.loadElements();
            }, function(error) {

            });
        };

        vm.deleteItem = function(id) {
            mpitemsService.deleteItem(id).then(function(response) {
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
            mpitemsService.setActive(item).then(function(response) {
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