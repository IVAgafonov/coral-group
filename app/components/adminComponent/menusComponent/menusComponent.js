(function () {
    'use strict';
    angular.module('pageModule')
        .component('menusComponent', menusComponentFn());

    function menusComponentFn() {
        return {
            templateUrl: 'components/adminComponent/menusComponent/menusComponent.html',
            controller: ['menuService', '$timeout', '$scope', '$anchorScroll', menusControllerFn]
        };
    }

    function menusControllerFn(menuService, $timeout, $scope, $anchorScroll) {
        var vm = this;

        vm.loadMenu = function() {
            menuService.getMenu().then(function(response) {
                vm.menuList = response.data;
            }, function(error) {

            });
        };

        vm.deleteMenu = function(id) {
            menuService.deleteMenu(id).then(function(response) {
                if (response.data.error) {
                    vm.messageType = 'danger';
                    vm.messageText = 'AdmInvalidOperation';
                } else {
                    vm.messageType = 'success';
                    vm.messageText = 'AdmSuccessOperation';
                    vm.loadMenu();
                }
            }, function(error) {
                vm.messageType = 'danger';
                vm.messageText = 'AdmInvalidOperation';
            });
            $timeout(function() {
                vm.messageText = '';
            }, 2000);
        };

        vm.saveMenu = function() {
            menuService.saveMenu(vm.menuTemplate, vm.menuUri).then(function(response) {
                if (response.data.error) {
                    vm.messageType = 'danger';
                    vm.messageText = 'AdmInvalidOperation';
                } else {
                    vm.messageType = 'success';
                    vm.messageText = 'AdmSuccessOperation';
                    vm.loadMenu();
                }
            }, function(error) {
                vm.messageType = 'danger';
                vm.messageText = 'AdmInvalidOperation';
            });
            $timeout(function() {
                vm.messageText = '';
            }, 2000);
        };

        vm.editMenu = function(id) {
            var editableItem = fidnById(vm.menuList, id);
            vm.menuTemplate = editableItem.name;
            vm.menuUri = editableItem.uri;
            $anchorScroll('addMenuHash');
        };

        vm.changeActive = function(item) {
            menuService.changeActive(item).then(function(response) {
                if (response.data.error) {
                    vm.messageType = 'danger';
                    vm.messageText = 'AdmInvalidOperation';
                } else {
                    vm.messageType = 'success';
                    vm.messageText = 'AdmSuccessOperation';
                    vm.loadMenu();
                }
            }, function(error) {
                vm.messageType = 'danger';
                vm.messageText = 'AdmInvalidOperation';
            });
            $timeout(function() {
                vm.messageText = '';
            }, 2000);
        };

        vm.sortMenu = function() {
            menuService.sortMenu(vm.menuList).then(function(response) {
                vm.loadMenu();
            }, function(error) {

            });
        };

        function fidnById(list, id) {
            for(var i = 0; i <= list.length-1; i++) {
                if (list[i].id == id) return list[i];
                if (list[i].child && list[i].child.length) {
                     var item = fidnById(list[i].child, id);
                     if (item) return item;
                }
            }
        }

        vm.loadMenu();
    }
})();