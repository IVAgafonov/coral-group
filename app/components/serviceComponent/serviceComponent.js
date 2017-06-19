(function () {
    'use strict';
    angular.module('pageModule')
        .component('serviceComponent', serviceComponentFn());

    function serviceComponentFn() {
        return {
            templateUrl: 'components/serviceComponent/serviceComponent.html',
            controller: ['serviceService', '$rootScope', '$timeout', '$stateParams', '$state' , '$location', '$sce', '$filter', '$translate' , serviceControllerFn]
        }
    }

    function serviceControllerFn(serviceService, $rootScope, $timeout, $stateParams, $state, $location, $sce, $filter, $translate) {
        var vm = this;
        $rootScope.showHeader = true;
        $rootScope.showOnlyDesctop = true;
        $rootScope.showOnTabletVertical = true;
        vm.toUp = true;
        vm.footerMargin = true;
        var translate = $filter;
        vm.anchors = [];
        vm.uiOnParamsChanged = function(newParams) {
            $.fn.fullpage.silentMoveTo(newParams.service, 1);
        };
        vm.heddenphone = true;

        var loaded = 0;
        vm.loadServices = function() {
            serviceService.get().then(function (response) {
                vm.services = response.data;
                serviceService.getImages().then(function (response) {
                    for(var keys in vm.services) {
                        vm.services[keys].desc_template = $sce.trustAsHtml($translate.instant(vm.services[keys].desc_template));
                        vm.anchors.push(vm.services[keys].uri);
                        vm.services[keys].images = [];
                        for(var keyi in response.data) {
                            if (vm.services[keys].id == response.data[keyi].service_id) {
                                vm.services[keys].images.push(response.data[keyi]);
                            }
                        }
                    }
                    $timeout(function() {
                        $('#fullpage').fullpage({
                            anchors: vm.anchors,
                            menu: '#parentmenu1',
                            lockAnchors: true,
                            scrollingSpeed: 1300,
                            afterLoad: function (anchorLink, index) {
                                if (index == 1) {
                                    vm.toUp = false;
                                }
                                if (index == 6) {
                                    vm.toUp = true;
                                }
                                vm.heddenphone = false;
                                if (anchorLink != $stateParams.service && loaded) {
                                    $state.go('app.service', {service: anchorLink}, {
                                        notify: false,
                                        reload: false,
                                        location:'replace',
                                        inherit:true
                                    });
                                }
                                loaded = 1;//kostil
                            }
                        });
                    });
                    $timeout(function(){
                        $.fn.fullpage.silentMoveTo($stateParams.service, 1);
                    });
                }, function(error) {

                });
            }, function (error) {

            });
        };

        vm.nextSlide = function() {
            if (vm.toUp) {
                $.fn.fullpage.moveTo(1);
            } else {
                $.fn.fullpage.moveSectionDown();
            }

        };

        vm.loadServices();
    }
})();