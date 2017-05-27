(function () {
    angular.module('pageModule')
        .component('newsAdmComponent', newsComponentFn());

    function newsComponentFn() {
        return {
            templateUrl: 'components/adminComponent/newsComponent/newsComponent.html',
            controller:  ['newsService', '$timeout', '$state', newsControllerFn]
        }
    }

    function newsControllerFn(newsService, $timeout, $state) {
        var vm = this;

        vm.messageText = '';
        vm.messageType = '';

        vm.item = {locale: 'RU'};

        vm.loadElements = function() {
            newsService.getItems().then(function(response) {
                vm.items = response.data;
            }, function(error) {

            });
        };

        vm.editItem = function(item) {
            vm.item.news_name = item.news_name;
            vm.item.date = item.date;
            vm.item.locale = item.locale;
            vm.item.news_desc = item.news_desc;
        };

        vm.saveItem = function() {
            newsService.saveItem(vm.item).then(function(response) {
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
            newsService.sortItems(vm.items).then(function(response) {
                vm.loadElements();
            }, function(error) {

            });
        };

        vm.changeActive = function(item) {
            newsService.setActive(item).then(function(response) {
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
            newsService.deleteItem(id).then(function(response) {
                if (response.data.error) {
                    vm.messageType = 'danger';
                    vm.messageText = 'AdmInvalidOperation';
                } else {
                    vm.messageType = 'success';
                    vm.messageText = 'AdmSuccessOperation';
                    $state.go('app.admin.news');
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