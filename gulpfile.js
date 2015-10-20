'use strict';

var gulp = require('gulp');
var jshint = require('gulp-jshint');
var mocha = require('gulp-mocha');
var webpack = require('webpack-stream');


gulp.task('webpack', function() {
  return gulp.src('./app/entry.js')
    .pipe(webpack({
      output: {
        filename: 'main.js',
      }
    }))
    .pipe(gulp.dest('./app'));
});

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

gulp.task('webpack:watch', function() {
  gulp.watch('./app/**/*.js', ['webpack']);
});

gulp.task('default', ['build']);

gulp.task('build', ['jshint', 'test', 'webpack']);

