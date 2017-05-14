(function () {
    'use strict';
    angular.module('pageModule')
        .component('translateComponent', translateComponentFn());

    function translateComponentFn() {
        return {
            templateUrl: 'components/adminComponent/translateComponent/translateComponent.html',
            controller: ['translateService', '$timeout', '$anchorScroll', translateControllerFn]
        };
    }

    function translateControllerFn(translateService, $timeout, $anchorScroll) {
        var vm = this;

        vm.translateTextFilter = '';
        vm.translateLocaleFilter = '';
        vm.translateImportantFilter = true;

        vm.save = function () {
            if (vm.translateTemplate != '' && vm.translateTranslate != '' && vm.translateLocale != '') {
                translateService.saveTranslation(
                    vm.translateTemplate,
                    vm.translateTranslate,
                    vm.translateLocale,
                    vm.translateImportant
                ).then(function(response) {
                    if (response.data.error) {
                        vm.messageType = 'danger';
                        vm.messageText = 'AdmInvalidOperation';
                    } else {
                        vm.messageType = 'success';
                        vm.messageText = 'AdmSuccessOperation';
                        vm.loadTranslate();
                    }
                    vm.clearAddForm();
                }, function (error) {
                    vm.messageType = 'danger';
                    vm.messageText = 'AdmInvalidOperation';
                });
                $timeout(function() {
                    vm.messageText = '';
                }, 2000);
            }
        };

        vm.loadTranslate = function() {
            translateService.getTranslate(vm.translateLocaleFilter, vm.translateImportantFilter, vm.translateTextFilter).then(function(response) {
                vm.translateList = response.data;
            }, function(error) {

            });

        };

        vm.changeImportant = function (index) {
            translateService.setImportant(vm.translateList[index].id, vm.translateList[index].is_important).then(function(response) {
                vm.loadTranslate();
            }, function(error) {

            });

        };

        vm.deleteTranslate = function(index) {
            translateService.deleteTranslation(vm.translateList[index].id).then(function(response) {
                if (response.data.error) {
                    vm.messageType = 'danger';
                    vm.messageText = 'AdmInvalidOperation';
                } else {
                    vm.messageType = 'success';
                    vm.messageText = 'AdmSuccessOperation';
                    vm.loadTranslate();
                }
            }, function(error) {
                vm.messageType = 'danger';
                vm.messageText = 'AdmInvalidOperation';
            });
            $timeout(function() {
                vm.messageText = '';
            }, 2000);
        };

        vm.editTranslate = function(index) {
            vm.translateTemplate = vm.translateList[index].template;
            vm.translateTranslate = vm.translateList[index].translate;
            vm.translateLocale = vm.translateList[index].locale;
            vm.translateImportant = vm.translateList[index].is_important;
            $anchorScroll('addTranslateHash');
        };

        vm.clearAddForm = function() {
            vm.translateTemplate = '';
            vm.translateTranslate = '';
            vm.translateLocale = 'RU';
            vm.translateImportant = false;
        };

        vm.loadTranslate();
        vm.clearAddForm();
    }

})();