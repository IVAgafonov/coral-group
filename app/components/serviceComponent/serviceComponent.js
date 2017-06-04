(function () {
    'use strict';
    angular.module('pageModule')
        .component('serviceComponent', serviceComponentFn());

    function serviceComponentFn() {
        return {
            templateUrl: 'components/serviceComponent/serviceComponent.html',
            controller: ['serviceService', '$rootScope', '$timeout', '$stateParams', '$state' , '$location', serviceControllerFn]
        }
    }

    function serviceControllerFn(serviceService, $rootScope, $timeout, $stateParams, $state, $location) {
        var vm = this;
        $rootScope.showHeader = false;

        vm.anchors = [];
        vm.uiOnParamsChanged = function(newParams) {
            $.fn.fullpage.silentMoveTo(newParams.service, 1);
        };



        vm.loadServices = function() {
            serviceService.get().then(function (response) {
                vm.services = response.data;
                serviceService.getImages().then(function (response) {
                    for(var keys in vm.services) {
                        vm.anchors.push(vm.services[keys].uri);
                        vm.services[keys].images = [];
                        for(var keyi in response.data) {
                            if (vm.services[keys].id == response.data[keyi].service_id) {
                                vm.services[keys].images.push(response.data[keyi]);
                            }
                        }
                    }
                    $timeout(function() {
                        if ($.fn.fullpage.destroy) {
                            $.fn.fullpage.destroy('all');
                        }
                        $('#fullpage').fullpage({
                            anchors: vm.anchors,
                            menu: '#parentmenu1',
                            lockAnchors: true,
                            afterLoad: function (anchorLink, index) {

                                if (anchorLink != $stateParams.service) {
                                    $state.go('app.service', {service: anchorLink}, {
                                        notify: false,
                                        reload: false,
                                        location:'replace',
                                        inherit:true
                                    });
                                }
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

        vm.loadServices();
    }
})();