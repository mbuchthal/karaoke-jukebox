'use strict';

var gulp = require('gulp');
var jshint = require('gulp-jshint');
var mocha = require('gulp-mocha');

gulp.task('jshint', function() {
  return gulp.src('./*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('test', function() {
  return gulp.src('test/*.js', { read: false })
    .pipe(mocha({reporter: 'spec'}))
    .once('error', function() {
      console.log('tests failed');
      process.exit(1);
    })
    .once('end', function() {
      process.exit();
    });
});

gulp.task('build', ['jshint', 'test']);

gulp.task('default', ['build']);
