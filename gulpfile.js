'use strict';

var gulp = require('gulp');
var jshint = require('gulp-jshint');
var mocha = require('gulp-mocha');
var jscs = require('gulp-jscs');
var sass = require('gulp-sass');
var webpack = require('webpack-stream');

var lintableFiles = ['!node_modules/**', './**/*.js'];
var staticFiles = ['./app/**/*.html', './app/**/*.svg', './app/**/*.jpg', './app/**/*.png', './app/**/icomoon.*', './app/js/ngLoadScript.js', './app/js/decodeQR.js', './app/js/llqrcode.js'];

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
  return gulp.src('test/server_tests/all_server_tests.js', {read: false})
    .pipe(mocha({reporter: 'spec'}));
});

gulp.task('staticfiles', function() {
  return gulp.src(staticFiles)
    .pipe(gulp.dest('./build'));
});

gulp.task('staticfiles:qr', function() {
  return gulp.src(['./app/js/ngLoadScript.js', './app/js/decodeQR.js', './app/js/llqrcode.js'])
    .pipe(gulp.dest('./build/js'));
});

gulp.task('sass', function() {
  gulp.src('./app/sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./build/css'));
});

gulp.task('webpack', function() {
  return gulp.src('./app/index.js')
    .pipe(webpack({
      output: {
        filename: 'main.js',
      }
    }))
    .pipe(gulp.dest('./build/js'));
});

gulp.task('watch', function() {
  gulp.watch('./app/sass/**/*.scss', ['sass']);
  gulp.watch('./app/**/*.js', ['webpack']);
  gulp.watch(staticFiles, ['staticfiles']);
  gulp.watch('./app/**/*.js', ['staticfiles:qr']);
});

gulp.task('build:dev', ['jshint', 'jscs:warn', 'staticfiles', 'staticfiles:qr', 'sass', 'webpack']);
gulp.task('build:pro', ['staticfiles', 'staticfiles:qr', 'sass', 'webpack']);

gulp.task('tests', ['servertests']);
gulp.task('default', ['build:dev', 'tests']);
