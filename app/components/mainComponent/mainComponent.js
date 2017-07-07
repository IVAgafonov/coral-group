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
        $rootScope.showOnlyDesctop = false;
        vm.footerMargin = true;
        vm.toUp = false;
        $timeout(function() {
            var speedScrool = 700;

            if (window.innerWidth <= 960) {
                speedScrool = 1300;
            }
            if ($.fn.fullpage.destroy) {
                $.fn.fullpage.destroy('all');
            }
            $('#fullpage').fullpage({
                scrollingSpeed: speedScrool,
                afterLoad: function (anchorLink, index) {
                    if (index == 1) {
                        vm.toUp = false;
                    }
                    if (index == 3) {
                        vm.toUp = true;
                        vm.footerMargin = true;
                    } else {
                        vm.footerMargin = false;
                    }
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

        vm.nextSlide = function() {
            if (vm.toUp) {
                $.fn.fullpage.moveTo(1);
            } else {
                $.fn.fullpage.moveSectionDown();
            }

        };

        vm.loadservices = function () {
            mpitemsService.get().then(function (response) {
                vm.services = response.data;
            }, function (error) {

            });
        };

        vm.loadservices();
    }
})();