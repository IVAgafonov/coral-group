(function () {
    'use strict';
    angular.module('pageModule')
        .component('aboutComponent', aboutComponentFn());

    function aboutComponentFn() {
        return {
            templateUrl: 'components/aboutComponent/aboutComponent.html',
            controller: ['$rootScope', 'abitemsService', aboutControllerFn]
        }
    }

    function aboutControllerFn($rootScope, abitemsService) {
        var vm = this;
        vm.safary = false;
        vm.items = [];
        $rootScope.showHeader = true;
        $rootScope.showOnlyDesctop = false;
        var userAgent = window.navigator.userAgent.toLowerCase();
        vm.safary = /safari/.test( userAgent );


        vm.getItems = function() {
            abitemsService.get().then(function(response){
               vm.items = response.data;
            }, function(error){

            });
        };

        var player, iframe;
        var $ = document.querySelector.bind(document);

        function onYouTubeIframeAPIReady() {
            if (!vm.safary) {
                player = new YT.Player('player', {
                    height: '200',
                    width: '300',
                    videoId: '_7sLli0OeCk',
                    playerVars: {
                        controls: 1,
                        loop: 1,
                        modestbranding: 1,
                        rel: 0,
                        showinfo: 0,
                        autohide:1
                    },
                    events: {
                        'onReady': onPlayerReady,
                    }
                });
            }
        }

        function onPlayerReady(event) {
            if (!vm.safary) {
                var player = event.target;
                iframe = $('#player');
                //if (!vm.safary) {
                document.addEventListener("fullscreenchange", function () {
                    if (!document.fullscreenElement) player.stopVideo();
                }, false);

                document.addEventListener("msfullscreenchange", function () {
                    if (!document.msFullscreenElement) player.stopVideo();
                }, false);

                document.addEventListener("mozfullscreenchange", function () {
                    if (!document.mozFullScreen) player.stopVideo();
                }, false);

                document.addEventListener("webkitfullscreenchange", function () {
                    if (!document.webkitIsFullScreen) player.stopVideo();
                }, false);
                // }
            }
        }


        vm.runVideo = function() {
            if (!vm.safary) {
                player.playVideo();

                var requestFullScreen = iframe.requestFullScreen || iframe.mozRequestFullScreen || iframe.webkitRequestFullScreen;
                if (requestFullScreen) {
                    requestFullScreen.bind(iframe)();
                }
            }
        };

        onYouTubeIframeAPIReady();
        vm.getItems();
    }
})();