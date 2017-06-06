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
        vm.items = [];
        $rootScope.showHeader = true;

        vm.getItems = function() {
            abitemsService.get().then(function(response){
               vm.items = response.data;
            }, function(error){

            });
        };

        var player, iframe;
        var $ = document.querySelector.bind(document);

        function onYouTubeIframeAPIReady() {
            player = new YT.Player('player', {
                height: '200',
                width: '300',
                videoId: '_7sLli0OeCk',
                events: {
                    'onReady': onPlayerReady,
                }
            });
        }

        function onPlayerReady(event) {
            var player = event.target;
            iframe = $('#player');
            document.addEventListener("fullscreenchange", function() {
                if (!document.fullscreenElement) player.stopVideo();
            }, false);

            document.addEventListener("msfullscreenchange", function() {
                if (!document.msFullscreenElement) player.stopVideo();
            }, false);

            document.addEventListener("mozfullscreenchange", function() {
                if (!document.mozFullScreen) player.stopVideo();
            }, false);

            document.addEventListener("webkitfullscreenchange", function() {
                if (!document.webkitIsFullScreen) player.stopVideo();
            }, false);
        }


        vm.runVideo = function() {
            player.playVideo();//won't work on mobile

            var requestFullScreen = iframe.requestFullScreen || iframe.mozRequestFullScreen || iframe.webkitRequestFullScreen;
            if (requestFullScreen) {
                requestFullScreen.bind(iframe)();
            }
        };

        onYouTubeIframeAPIReady();
        vm.getItems();
    }
})();