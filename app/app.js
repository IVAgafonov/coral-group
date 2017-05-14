(function () {
    'use strict';
    angular.module('app', ['ngCookies', 'app.router', 'ui.bootstrap', 'systemModule', 'pageModule', 'angularFileUpload'])
        .constant('adminCssFile', 'admin.css?v=0.0.1');
})();

