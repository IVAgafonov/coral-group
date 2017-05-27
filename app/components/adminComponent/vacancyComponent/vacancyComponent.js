(function () {
    angular.module('pageModule')
        .component('vacancyAdmComponent', vacancyComponentFn());

    function vacancyComponentFn() {
        return {
            templateUrl: 'components/adminComponent/vacancyComponent/vacancyComponent.html',
            controller:  ['vacancyService', '$timeout', abItemsControllerFn]
        }
    }

    function abItemsControllerFn(vacancyService, $timeout) {
        var vm = this;

        vm.messageText = '';
        vm.messageType = '';


        vm.item = {locale: 'RU'};

        vm.loadElements = function() {
            vacancyService.getItems().then(function(response) {
                vm.items = response.data;
            }, function(error) {

            });
        };

        vm.editItem = function(item) {
            vm.item.vacancy_name = item.vacancy_name;
            vm.item.date = item.date;
            vm.item.locale = item.locale;
            vm.item.vacancy_desc = item.vacancy_desc;
            vm.item.vacancy_require = item.vacancy_require;
            vm.item.vacancy_conditions = item.vacancy_conditions;
            vm.item.vacancy_addr = item.vacancy_addr;
            vm.item.busy_type = item.busy_type;
        };

        vm.saveItem = function() {
            vacancyService.saveItem(vm.item).then(function(response) {
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
            vacancyService.sortItems(vm.items).then(function(response) {
                vm.loadElements();
            }, function(error) {

            });
        };

        vm.deleteItem = function(id) {
            vacancyService.deleteItem(id).then(function(response) {
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
            vacancyService.setActive(item).then(function(response) {
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