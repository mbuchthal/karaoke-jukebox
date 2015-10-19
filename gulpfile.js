'use strict';

var gulp = require('gulp');
var jshint = require('gulp-jshint');
var mocha = require('gulp-mocha');
var jscs = require('gulp-jscs');
var sass = require('gulp-sass');

var lintableFiles = ['!node_modules/**', './**/*.js'];

var hadError = false;

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
    .pipe(mocha({reporter: 'spec'}))
    .on('error', function() {
      hadError = true;
    });
});

gulp.task('sass', function () {
  gulp.src('./sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./css'));
});

gulp.task('sass:watch', function () {
  gulp.watch('./sass/**/*.scss', ['sass']);
});

gulp.task('build', ['jshint', 'jscs:warn']);

gulp.task('tests:test', ['servertests']);
gulp.task('tests:build', ['servertests']);
gulp.task('default', ['build', 'tests:build']);


