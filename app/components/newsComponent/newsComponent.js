(function () {
    'use strict';
    angular.module('pageModule')
        .component('newsComponent', newsComponentFn());

    function newsComponentFn() {
        return {
            templateUrl: 'components/newsComponent/newsComponent.html',
            controller: ['$rootScope', 'newsService', 'newstagsService', '$timeout', '$sce', newsControllerFn]
        }
    }

    function newsControllerFn($rootScope, newsService, newstagsService, $timeout, $sce) {
        var vm = this;
        $rootScope.showHeader = true;
        $rootScope.showOnlyDesctop = true;
        $rootScope.showOnTabletVertical = true;
        vm.bgIndex = 0;
        vm.items = [];
        vm.itemsTags = [];
        vm.heddenphone = true;
        vm.loadElements = function() {
            vm.items = [];

            if (vm.itemsTags.length == 0) {
                newstagsService.get().then(function(response) {
                    vm.itemsTags = [];
                    for (var key in response.data) {
                        vm.itemsTags.push({tag: response.data[key].tag_template , active: true});
                    }
                }, function(error) {

                });
            }

            newsService.get(JSON.stringify(vm.itemsTags)).then(function(response) {
                vm.itemsRaw = response.data;
                newsService.getImages().then(function(response) {
                    vm.items = vm.itemsRaw.filter(function(item) {
                        if ($rootScope.locale.toUpperCase() == item.locale) {
                            return true;
                        }
                        return false;
                    });
                    var images = response.data;
                    for (var keys in vm.items) {
                        vm.items[keys].news_desc = $sce.trustAsHtml(vm.items[keys].news_desc);
                        vm.items[keys].images = [];
                        for (var keyi in images) {
                            if (vm.items[keys].id == images[keyi].news_id) {
                                if (images[keyi].active > 0) {
                                    vm.items[keys].images.push(images[keyi]);
                                }
                            }
                        }
                    }
                    console.log(vm.items);
                });

                $timeout(function() {
                    var owlnews = $('.owlnews').owlCarousel({
                        autoPlay: 2000,
                        stopOnHover: true,
                        slideSpeed : 300,
                        paginationSpeed : 400,
                        singleItem : true,
                        items: 1,
                        animateOut2: 'slideOutUp',
                        animateIn2: 'slideInUp',
                        nav: true,
                        mouseDrag: false,
                        autoHeight:true,
                        navText: ['', '']
                    });

                    owlnews.on('changed.owl.carousel', function(event) {
                        if (event.target.className == "owl-carousel owlnews news owl-loaded") {
                            if (event.item.index) {
                                $timeout(function() {
                                    vm.bgIndex = event.item.index;
                                });
                            } else {
                                $timeout(function() {
                                    vm.bgIndex =0;
                                });
                            }
                        }
                    });

                    var owlimgs = $('.owlnewsimg').owlCarousel({
                        autoPlay: 2000,
                        stopOnHover: true,
                        slideSpeed : 300,
                        paginationSpeed : 400,
                        singleItem : true,
                        items: 1,
                        animateOut2: 'slideOutUp',
                        animateIn2: 'slideInUp',
                        nav: false,
                        dots: true,
                        mouseDrag: false,
                        navText: ['', '']
                    });

                    owlimgs.on('changed.owl.carousel', function(event) {

                    });
                }, 1000);
            }, function(error) {

            });
        };

        vm.loadNewsTags = function() {

        };

        vm.changeTagStatus = function(index) {
            $timeout(function() {
                $('.owlnews').owlCarousel('destroy');
                $('.owlnewsimg').owlCarousel('destroy');
                vm.itemsTags[index].active = !vm.itemsTags[index].active;
                vm.loadElements();
            }, 100);


        };

        vm.loadNewsTags();
        vm.loadElements();
    }
})();