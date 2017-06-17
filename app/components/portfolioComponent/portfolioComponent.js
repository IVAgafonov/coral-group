(function () {
    'use strict';
    angular.module('pageModule')
        .component('portfolioComponent', portfolioComponentFn());

    function portfolioComponentFn() {
        return {
            templateUrl: 'components/portfolioComponent/portfolioComponent.html',
            controller: ['portfolioService', '$rootScope', '$timeout', portfolioControllerFn]
        }
    }

    function portfolioControllerFn(portfolioService, $rootScope, $timeout) {
        var vm = this;
        $rootScope.showHeader = true;
        $rootScope.showOnlyDesctop = true;
        $rootScope.showOnTabletVertical = true;
        vm.heddenphone = true;
        vm.items = [];
        vm.itemsDesctop = [];
        vm.loadElements = function() {
            portfolioService.get().then(function(response) {
                vm.items = response.data;
                portfolioService.getImages().then(function(response) {
                    var images = response.data;
                    for (var keys in vm.items) {
                        vm.items[keys].images = [];
                        for (var keyi in images) {
                            if (vm.items[keys].id == images[keyi].portfolio_id) {
                                vm.items[keys].images.push(images[keyi]);
                            }
                        }
                    }

                    var i = 0;
                    var n = 0;
                    for (var keys in vm.items) {
                        if (!vm.itemsDesctop[n]) {
                            vm.itemsDesctop[n] = [];
                        }
                        vm.itemsDesctop[n].push(vm.items[keys]);
                        i++;
                        if (i == 3) {
                            n++;
                            i = 0;
                        }
                    }

                    $timeout(function () {
                        //$('.mobileowl').owlCarousel('destroy');
                        var owl = $('.owl').owlCarousel({
                            loop: false,
                            autoPlay: 2000,
                            stopOnHover: true,
                            slideSpeed: 300,
                            paginationSpeed: 400,
                            singleItem: true,
                            autoWidth:false,
                            items: 3,
                            animateOut: '',
                            animateIn: '',
                            nav: true,
                            mouseDrag: false,
                            rewindNav   : false,
                            responsive : {
                                0 : {
                                    items: 1,
                                },
                                700 : {
                                    items: 2,
                                },
                                1100 : {
                                    items: 3,
                                }
                            },
                            navText: ['', '']
                        });


                        //$('.desctopowl').owlCarousel('destroy');
                        owl.on('resize.owl.carousel', function(event) {
                            $('.owl').owlCarousel('destroy');
                            var owl = $('.owl').owlCarousel({
                                loop: false,
                                autoPlay: 2000,
                                stopOnHover: true,
                                slideSpeed : 300,
                                autoWidth:false,
                                paginationSpeed : 400,
                                singleItem : true,
                                items: 3,
                                rewindNav   : false,
                                responsive : {
                                    0 : {
                                        items: 1,
                                    },
                                    700 : {
                                        items: 2,
                                    },
                                    1100 : {
                                        items: 3,
                                    }
                                },
                                animateOut: '',
                                animateIn: '',
                                nav: true,
                                mouseDrag: false,
                                navText: ['', '']
                            });


                        });
                    });
                }, function(error) {

                });
            }, function() {

            })
        };

        vm.loadElements();
    }
})();