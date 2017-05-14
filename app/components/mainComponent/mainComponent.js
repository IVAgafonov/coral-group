(function () {
    'use strict';
    angular.module('pageModule').
        component('mainComponent', {
            templateUrl: 'components/mainComponent/mainComponent.html',
            controller: ['$timeout', '$rootScope', 'mpitemsService', mainController]
    });
    
    function mainController($timeout, $rootScope, mpitemsService) {
        var vm = this;

        $rootScope.showHeader = true;
        $timeout(function() {
            if ($.fn.fullpage.destroy) {
                $.fn.fullpage.destroy('all');
            }
            $('#fullpage').fullpage({
                afterLoad: function (anchorLink, index) {
                    if (index == 1) {
                        $timeout(function () {
                            $rootScope.showHeader = true;
                        });
                    } else {
                        $timeout(function () {
                            $rootScope.showHeader = false;
                        });
                    }
                }
            });
        });

        vm.loadservices = function () {
            mpitemsService.get().then(function (response) {
                vm.services = response.data;
            }, function (error) {

            });
        };

        vm.loadservices();
    }
})();