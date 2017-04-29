(function () {
    'use strict';
    angular.module('pageModule')
        .component('adminComponent', {
            templateUrl: 'components/adminComponent/adminComponent.html',
            controller: ['authService', adminController]
                
    });
    
    function adminController(authService) {
        var vm = this;
        vm.userName = 'unnamed';
        vm.logout = function() {
            var res = authService.logout();
            console.log(res);
        }
    }
})();

