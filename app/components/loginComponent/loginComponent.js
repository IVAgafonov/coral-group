(function () {
    'use strict';
    angular.module('systemModule')
        .component('loginComponent', {
            templateUrl: 'components/loginComponent/loginComponent.html',
            controller: ['authService', '$rootScope', '$state', loginController]
    });
    
    function loginController(authService, $rootScope, $state) {
        var vm = this;
        
        authService.check().then(function (response) {
            if (response.auth) {
                $rootScope.auth = true;
                $state.go('admin');
            }
        });
        
        vm.login = function () {
            vm.error = false;
            authService.login(vm.uname, vm.credential).then(function(response){
                if (response.auth) {
                    $rootScope.auth = true;
                    $state.go('admin');
                } else {
                    vm.error = 'Invalid email or password';
                }
            }, function (error) {
                vm.error = 'Invalid operation';
                console.log(error);
            });
        }
        
        vm.logout = function () {
            
        }
    }
})();