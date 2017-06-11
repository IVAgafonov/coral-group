(function () {
    angular.module('pageModule')
        .component('serviceAdmComponent', serviceComponentFn());

    function serviceComponentFn() {
        return {
            templateUrl: 'components/adminComponent/serviceComponent/serviceComponent.html',
            controller:  ['serviceService', 'menuService', '$timeout', 'FileUploader', serviceControllerFn]
        }
    }

    function serviceControllerFn(serviceService, menuService, $timeout, FileUploader) {
        var vm = this;

        vm.messageText = '';
        vm.messageType = '';

        vm.item = {};

        vm.uploader = new FileUploader({
            url: '/api/v1/service/icon',
            autoUpload: true,
            removeAfterUpload: true
        });

        vm.uploaderBg = new FileUploader({
            url: '/api/v1/service/background',
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

        vm.uploaderBg.onSuccessItem = function (fileItem, response, status, headers) {
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

            serviceService.getItems().then(function(response) {
                vm.items = response.data;
            }, function(error) {

            });
        };

        vm.deleteIcon = function(item) {
            serviceService.deleteIcon(item.id).then(function(response) {
                if (response.data.status && response.data.status == 'ok') {
                    item.icon = '';
                }
            }, function(error) {

            })
        };

        vm.deleteBackground = function(item) {
            serviceService.deleteBackground(item.id).then(function(response) {
                if (response.data.status && response.data.status == 'ok') {
                    item.background = '';
                }
            }, function(error) {

            })
        };

        vm.editItem = function(item) {
            vm.item.nameTemplate = item.name_template;
            vm.item.descTemplate = item.desc_template;
            vm.item.menuItemId = item.menu_id;
            if (item.id) {
                vm.item.Id = item.id;
            }
        };

        vm.saveItem = function() {
            serviceService.saveItem(vm.item).then(function(response) {
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
            serviceService.sortItems(vm.items).then(function(response) {
                vm.loadElements();
            }, function(error) {

            });
        };

        vm.deleteItem = function(id) {
            serviceService.deleteItem(id).then(function(response) {
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