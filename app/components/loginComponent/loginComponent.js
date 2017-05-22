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
                $state.go('app.admin');
            }
        });
        
        vm.login = function () {
            vm.error = false;
            authService.login(vm.uname, vm.credential).then(function(response){
                if (response.auth) {
                    $rootScope.auth = true;
                    $state.go('app.admin');
                } else {
                    console.log(response);
                    vm.error = 'Invalid email or password';
                }
            }, function (error) {
                vm.error = 'Invalid operation';
                console.log(error);
            });
<<<<<<< HEAD
<<<<<<< HEAD
        }
        
        vm.logout = function () {
            
=======
        };
        vm.logout = function () {
>>>>>>> master
=======
        };
<<<<<<< HEAD
<<<<<<< HEAD
        
        vm.logout = function () {
            
=======
        vm.logout = function () {
>>>>>>> master
=======
        vm.logout = function () {
<<<<<<< HEAD
>>>>>>> 3b9dd66bc40fc480b04345d86a64f653e66d8842
=======
>>>>>>> bccb1a7a42915c417f3f242daf690b7e2f1fd3d2
>>>>>>> dev-1
        }
    }
})();