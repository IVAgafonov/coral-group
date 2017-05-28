(function () {
    angular.module('pageModule')
        .component('newsAdmImagesComponent', newsImagesComponentFn());

    function newsImagesComponentFn() {
        return {
            templateUrl: 'components/adminComponent/newsComponent/newsImagesComponent/newsImagesComponent.html',
            controller:  ['newsService', '$timeout', 'FileUploader', '$stateParams', newsImagesControllerFn]
        }
    }

    function newsImagesControllerFn(newsService, $timeout, FileUploader, $stateParams) {
        var vm = this;

        vm.idNews = $stateParams.idNews;

        vm.messageText = '';
        vm.messageType = '';

        vm.item = {};

        vm.uploader = new FileUploader({
            url: '/api/v1/news/image',
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
            newsService.getImages(vm.idNews).then(function(response) {
                vm.items = response.data;
            }, function(error) {

            });
        };

        vm.deleteItem = function(item) {
            newsService.deleteImage(item.id).then(function(response) {
                if (response.data.status && response.data.status == 'ok') {
                    item.icon = '';
                }
            }, function(error) {

            })
        };

        vm.sortItems = function() {
            newsService.sortImages(vm.items).then(function(response) {
                vm.loadElements();
            }, function(error) {

            });
        };

        vm.changeActive = function(item) {
            newsService.setActiveImage(item).then(function(response) {
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
            newsService.deleteImage(id).then(function(response) {
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