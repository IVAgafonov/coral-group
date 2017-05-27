(function () {
    angular.module('pageModule')
        .component('portfolioAdmImagesComponent', portfolioImagesComponentFn());

    function portfolioImagesComponentFn() {
        return {
            templateUrl: 'components/adminComponent/portfolioComponent/portfolioImagesComponent/portfolioImagesComponent.html',
            controller:  ['portfolioService', '$timeout', 'FileUploader', '$stateParams', portfolioImagesControllerFn]
        }
    }

    function portfolioImagesControllerFn(portfolioService, $timeout, FileUploader, $stateParams) {
        var vm = this;

        vm.idPortfolio = $stateParams.idPortfolio;

        vm.messageText = '';
        vm.messageType = '';

        vm.item = {};

        vm.uploader = new FileUploader({
            url: '/api/v1/portfolio/image',
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
            portfolioService.getImages(vm.idPortfolio).then(function(response) {
                vm.items = response.data;
            }, function(error) {

            });
        };

        vm.deleteItem = function(item) {
            portfolioService.deleteImage(item.id).then(function(response) {
                if (response.data.status && response.data.status == 'ok') {
                    item.icon = '';
                }
            }, function(error) {

            })
        };

        vm.sortItems = function() {
            portfolioService.sortImages(vm.items).then(function(response) {
                vm.loadElements();
            }, function(error) {

            });
        };

        vm.changeActive = function(item) {
            portfolioService.setActiveImage(item).then(function(response) {
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
            portfolioService.deleteImage(id).then(function(response) {
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