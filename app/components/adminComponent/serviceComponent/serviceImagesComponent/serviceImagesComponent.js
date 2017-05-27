(function () {
    angular.module('pageModule')
        .component('serviceAdmImagesComponent', serviceImagesComponentFn());

    function serviceImagesComponentFn() {
        return {
            templateUrl: 'components/adminComponent/serviceComponent/serviceImagesComponent/serviceImagesComponent.html',
            controller:  ['serviceService', 'menuService', '$timeout', 'FileUploader', '$stateParams', serviceImagesControllerFn]
        }
    }

    function serviceImagesControllerFn(serviceService, menuService, $timeout, FileUploader, $stateParams) {
        var vm = this;

        vm.idService = $stateParams.idService;

        vm.messageText = '';
        vm.messageType = '';

        vm.item = {};

        vm.uploader = new FileUploader({
            url: '/api/v1/service/image',
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
            serviceService.getImages(vm.idService).then(function(response) {
                vm.items = response.data;
            }, function(error) {

            });
        };

        vm.deleteItem = function(item) {
            serviceService.deleteImage(item.id).then(function(response) {
                if (response.data.status && response.data.status == 'ok') {
                    item.icon = '';
                }
            }, function(error) {

            })
        };

        vm.sortItems = function() {
            serviceService.sortImages(vm.items).then(function(response) {
                vm.loadElements();
            }, function(error) {

            });
        };

        vm.changeActive = function(item) {
            serviceService.setActiveImage(item).then(function(response) {
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

        vm.deleteImage = function(id) {
            serviceService.deleteImage(id).then(function(response) {
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