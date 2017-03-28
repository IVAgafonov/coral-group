var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();

var paths = {
    scripts: './app/**/*.js',
    styles: ['./app/styles/**/*.scss', './app/styles/**/*.sass'],
    images: './app/images/**/*',
    index: './app/index.html',
    partials: ['./app/**/*.html', '!app/index.html'],
    dev : './dev',
    prod: './prod'
};

function getTask(taskName) {
    return require('./gulptasks/' + taskName)(gulp, plugins, paths);
}

gulp.task('dev', getTask('buildDev'));