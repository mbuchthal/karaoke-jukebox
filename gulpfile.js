'use strict';

var gulp = require('gulp');
var jshint = require('gulp-jshint');
var mocha = require('gulp-mocha');
var jscs = require('gulp-jscs');

var lintableFiles = ['!node_modules/**', './**/*.js'];
var staticFiles = ['./app/index.html', './app/**.*.svg'];

gulp.task('jshint', function() {
  return gulp.src(lintableFiles)
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('jscs:warn', function() {
  return gulp.src(lintableFiles)
    .pipe(jscs())
    .pipe(jscs.reporter());
});

gulp.task('servertests', function() {
  return gulp.src('test/server_tests/**/*.js', {read: false})
    .pipe(mocha({reporter: 'spec'}));
});

gulp.task('staticfiles', function() {
  return gulp.src(staticFiles)
    .pipe(gulp.dest('build/'));
});

gulp.task('build:dev', ['jshint', 'jscs:warn', 'staticfiles']);
gulp.task('build:pro', ['staticfiles']);

gulp.task('tests', ['servertests']);
gulp.task('default', ['build:dev', 'tests']);
