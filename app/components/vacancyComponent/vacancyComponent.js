(function () {
    'use strict';
    angular.module('pageModule')
        .component('vacancyComponent', vacancyComponentFn());

    function vacancyComponentFn() {
        return {
            templateUrl: 'components/vacancyComponent/vacancyComponent.html',
            controller: ['$rootScope', 'vacancyService', 'FileUploader', '$timeout', vacancyControllerFn]
        }
    }

    function vacancyControllerFn($rootScope, vacancyService, FileUploader, $timeout) {
        var vm = this;
        $rootScope.showHeader = false;

        vm.messageText = '';
        vm.messageType = '';
        vm.messageHead = '';

        vm.formWrong = true;

        vm.fio = '';
        vm.email = '';
        vm.phone = '';

        vm.items = [];
        vm.currentItem = {};

        vm.uploader = new FileUploader({
            url: '/api/v1/vacancy/resume',
            autoUpload: true,
            removeAfterUpload: true
        });

        vm.uploader.onSuccessItem = function (fileItem, response, status, headers) {
            if (response.error) {
                vm.messageType = 'danger';
                vm.messageText = response.error;
                vm.messageHead = 'infoErrorSendStr';
                $timeout(function() {
                    vm.messageText = '';
                    vm.messageHead = '';
                }, 4000);
            } else {
                vm.messageType = 'success';
                vm.messageText = 'infoSuccessfulSendTextStr';
                vm.messageHead = 'infoSuccessfulSendStr';
                $timeout(function() {
                    vm.messageType = '';
                    vm.messageText = '';
                    vm.messageHead = '';
                }, 4000);
            }
        };

        vm.loadElements = function() {
            vacancyService.get().then(function (response) {
                vm.items = response.data;
                for (var key in vm.items) {
                    vm.items[key].vacancy_conditions = vm.items[key].vacancy_conditions.split("\n");
                    vm.items[key].vacancy_desc = vm.items[key].vacancy_desc.split("\n");
                    vm.items[key].vacancy_require = vm.items[key].vacancy_require.split("\n");
                }
                vm.currentItem = vm.items[0];
            },function () {

            });
        };

        vm.checkForm = function() {
            if (vm.fio.length < 3 || vm.email.length < 3 || vm.phone.length < 6) {
                vm.formWrong = true;
            } else {
                vm.formWrong = false;
            }
        };

        vm.loadElements();
    }
})();