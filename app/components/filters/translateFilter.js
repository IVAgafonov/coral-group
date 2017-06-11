(function() {
    'use strict';
    angular.module('systemModule')
        .filter('htmlSafe', ['$sce', function ($sce) {
            return function (htmlCode) {
                console.log(htmlCode);
                console.log($sce.trustAsHtml(htmlCode));
                return $sce.trustAsHtml(htmlCode);
            };
        }])
})();