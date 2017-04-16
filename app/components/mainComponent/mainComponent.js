(function () {
    'use strict';
    angular.module('pageModule').
        component('mainComponent', {
            templateUrl: 'components/mainComponent/mainComponent.html',
            controller: ['$timeout', mainController]
    });
    
    function mainController($timeout) {
        $timeout(function() {
            if ($.fn.fullpage.destroy) {
                $.fn.fullpage.destroy('all');
            }
            $('#fullpage').fullpage();
        });
    }
})();