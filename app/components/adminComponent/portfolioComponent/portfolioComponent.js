(function () {
    angular.module('pageModule')
        .component('portfolioAdmComponent', portfolioComponentFn());

    function portfolioComponentFn() {
        return {
            templateUrl: 'components/adminComponent/portfolioComponent/portfolioComponent.html',
            controller:  ['portfolioService', '$timeout', portfolioControllerFn]
        }
    }

    function portfolioControllerFn(portfolioService, $timeout) {
        var vm = this;

        vm.messageText = '';
        vm.messageType = '';


        vm.item = {};

        vm.loadElements = function() {
            portfolio.getItems().then(function(response) {
                vm.items = response.data;
            }, function(error) {

            });
        };

        vm.deleteImage = function(item) {
            portfolio.deleteItemsImage(item.id).then(function(response) {
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
            portfolio.saveItem(vm.item.itemTemplate, vm.item.descTemplate).then(function(response) {
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
            portfolio.sortItems(vm.items).then(function(response) {
                vm.loadElements();
            }, function(error) {

            });
        };

        vm.deleteItem = function(id) {
            portfolio.deleteItem(id).then(function(response) {
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
            portfolio.setActive(item).then(function(response) {
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