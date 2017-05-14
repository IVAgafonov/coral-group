var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();

var paths = {
    scripts: './app/**/*.js',
    styles: './app/styles/template.sass',
    stylesWatch: './app/styles/**/*',
    adminStyles: './app/styles/admin.sass',
    images: './app/images/**/*',
    index: './app/index.html',
    favicon: './app/favicon.ico',
    partials: ['./app/**/*.html', '!app/index.html'],
    fonts: './node_modules/bootstrap-sass/assets/fonts/**/*',
    php: ['./api/**/*', './api/**/.*'],
    phpVendor: './vendor/**/*',
    dev : './dev',
    prod: './prod'
};

function getTask(taskName) {
    return require('./gulptasks/' + taskName)(gulp, plugins, paths);
}

gulp.task('dev', getTask('buildDev'));

gulp.task('watchDev', function() {
    gulp.watch([paths.scripts, paths.images, paths.index, ], getTask('buildDev'));
});