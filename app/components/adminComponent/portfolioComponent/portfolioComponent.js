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
            portfolioService.getItems().then(function(response) {
                vm.items = response.data;
            }, function(error) {

            });
        };
              
        vm.editItem = function(item) {
            vm.item.nameTemplate = item.template_name;
        };

        vm.saveItem = function() {
            portfolioService.saveItem(vm.item).then(function(response) {
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
            portfolioService.sortItems(vm.items).then(function(response) {
                vm.loadElements();
            }, function(error) {

            });
        };

        vm.changeActive = function(item) {
            portfolioService.setActive(item).then(function(response) {
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

        vm.deleteItem = function(id) {
            portfolioService.deleteItem(id).then(function(response) {
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