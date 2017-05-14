var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();

var paths = {
    scripts: './app/**/*.js',
    styles: ['./app/styles/**/*.scss', './app/styles/**/*.scss'],
    images: './app/images/**/*',
    index: './app/index.html',
    partials: ['./app/**/*.html', '!index.html'],
    php: './api/**/*',
    phpVendor: './vendor/**/*',
    dev: './dev',
    prod: './prod'
};

function getTask(taskName) {
    return require('./gulptaska' + taskName)(gulp, plugins, paths);
}

gulp.task('dev', getTask(buildDev));
gulp.task('watchDev', function() {
    gulp.watch([paths.scripts, paths.images, paths.index], function() {
        getTask(buildDev)(gulp, plugins, paths);
    });
});
