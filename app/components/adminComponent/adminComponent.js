(function () {
    'use strict';
    angular.module('pageModule')
        .component('adminComponent', {
            templateUrl: 'components/adminComponent/adminComponent.html',
            controller: ['authService', '$state', adminController]
                
    });
    
    function adminController(authService, $state) {
        var vm = this;
        vm.userName = 'unnamed';
        vm.logout = function() {
            authService.logout();
            $state.go('app.login');
        };
    }
})();
