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
            .pipe(gulp.dest(paths.dev + '/js'));
    };

    pipes.stylesAdminCss = function () {
        var sourcemaps = require('gulp-sourcemaps');
        var cleanCss = require('gulp-clean-css');
        var autoprefixer = require('gulp-autoprefixer');
        
        return gulp.src(paths.adminStyles)
            .pipe(sourcemaps.init())
            .pipe(plugins.sass())
            .pipe(autoprefixer("last 2 version", "> 1%", "Explorer >= 8", {
                    cascade: true
                }))
            .pipe(plugins.concat('admin.css'))
            .pipe(cleanCss({compatibility: 'ie8'}))
            .pipe(sourcemaps.write('./'))
            .pipe(gulp.dest(paths.dev + '/css'));
    };
    
        pipes.stylesCss = function () {
        var sourcemaps = require('gulp-sourcemaps');
        var cleanCss = require('gulp-clean-css');
        var autoprefixer = require('gulp-autoprefixer');
        
        return gulp.src(paths.styles)
            .pipe(sourcemaps.init())
            .pipe(plugins.sass())
            .pipe(autoprefixer("last 2 version", "> 1%", "Explorer >= 8", {
                    cascade: true
                }))
            .pipe(plugins.concat('template.css'))
            .pipe(cleanCss({compatibility: 'ie8'}))
            .pipe(sourcemaps.write('./'))
            .pipe(gulp.dest(paths.dev + '/css'));
    };

    pipes.movePartials = function () {
        return gulp.src(paths.partials)
            .pipe(gulp.dest(paths.dev));
    };

    pipes.moveImages = function () {
        return gulp.src(paths.images)
            .pipe(gulp.dest(paths.dev + '/images'));
    };
    
    pipes.moveFonts = function () {
        return gulp.src(paths.fonts)
            .pipe(gulp.dest(paths.dev + '/fonts'));
    };

    pipes.moveFavicon = function () {
        return gulp.src(paths.favicon)
            .pipe(gulp.dest(paths.dev));
    };

    pipes.movePhp = function() {
        return gulp.src(paths.php)
            .pipe(gulp.dest(paths.dev + '/api'));
    };

    pipes.movePhpVendor = function() {
        return gulp.src(paths.phpVendor)
            .pipe(gulp.dest(paths.dev + '/vendor'));
    };

    pipes.buildDev = function () {
        var vendorScripts = pipes.vendorScripts();
        var otherScripts = pipes.otherScripts();
        var stylesCss = pipes.stylesCss();

        pipes.movePartials();
        pipes.moveImages();
        pipes.moveFonts();
        pipes.stylesAdminCss();
        pipes.moveFavicon();
        pipes.movePhp();
        pipes.movePhpVendor();

        var v = Date.now();

        var transformFn = function (filepath, file, i, length) {
            return '<script src="' + filepath + '" defer></script>';
        };

        return gulp.src(paths.index)
            .pipe(gulp.dest(paths.dev))
            .pipe(plugins.inject(vendorScripts, {relative: true, transform: transformFn ,name: 'bower'}))
            .pipe(plugins.inject(otherScripts, {relative: true, transform: transformFn ,addSuffix: '?v=' + v}))
            .pipe(plugins.inject(stylesCss, {relative: true, addSuffix: '?v=' + v}))
            .pipe(gulp.dest(paths.dev));
    };

    pipes.buildDev();

    gulp.watch([paths.index, paths.scripts, paths.partials, paths.styles, paths.images, paths.php, paths.phpVendor, paths.stylesWatch], function () {
        pipes.buildDev();
    });
};