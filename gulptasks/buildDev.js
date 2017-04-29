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
            .pipe(gulp.dest(paths.dev));
    };
    
    pipes.moveFonts = function () {
        return gulp.src(paths.fonts)
            .pipe(gulp.dest(paths.dev) + '/fonts');
    };

    pipes.buildDev = function () {
        var vendorScripts = pipes.vendorScripts();
        var otherScripts = pipes.otherScripts();
        var stylesAdminCss = pipes.stylesAdminCss();
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