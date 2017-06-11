(function() {
    'use strict';
    angular.module('pageModule')
        .directive('owlcarousel', function () {
            return {
                restrict: 'E',
                link: function (scope, element, attrs) {
                    var options = scope.$eval($(element).attr('data-options'));
                    //$(element).owlCarousel(options);
                }
            };
        });
})();