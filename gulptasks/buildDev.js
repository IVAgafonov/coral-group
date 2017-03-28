module.exports = function (gulp, plugins, paths) {

    var pipes = {};

    pipes.vendorScripts = function () {
        var bowerFiles = require('main-bower-files');
        return gulp.src(bowerFiles())
            .pipe(gulp.dest(paths.dev + '/bower_components'));
    };

    pipes.otherScripts = function () {
        return gulp.src(paths.scripts)
            .pipe(plugins.concat('app.js'))
            .pipe(gulp.dest(paths.dev + '/scripts'));
    };

    pipes.stylesCss = function () {
        return gulp.src(paths.styles)
            .pipe(plugins.sass())
            .pipe(plugins.concat('styles.css'))
            .pipe(gulp.dest(paths.dev + '/styles'));
    };

    pipes.movePartials = function () {
        return gulp.src(paths.partials)
            .pipe(gulp.dest(paths.dev))
    };

    pipes.moveImages = function () {
        return gulp.src(paths.images)
            .pipe(gulp.dest(paths.dev))
    };

    pipes.buildDev = function () {
        var vendorScripts = pipes.vendorScripts();
        var otherScripts = pipes.otherScripts();
        var stylesCss = pipes.stylesCss();
        pipes.movePartials();
        pipes.moveImages();

        var v = Date.now();

        return gulp.src(paths.index)
            .pipe(gulp.dest(paths.dev))
            .pipe(plugins.inject(vendorScripts, {relative: true, name: 'bower'}))
            .pipe(plugins.inject(otherScripts, {relative: true, addSuffix: '?v=' + v}))
            .pipe(plugins.inject(stylesCss, {relative: true, addSuffix: '?v=' + v}))
            .pipe(gulp.dest(paths.dev));
    };

    pipes.buildDev();

    gulp.watch([paths.index, paths.scripts, paths.partials, paths.styles, paths.images], function () {
        pipes.buildDev();
    });
};