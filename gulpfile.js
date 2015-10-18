'use strict';

var gulp = require('gulp');
var jshint = require('gulp-jshint');
var mocha = require('gulp-mocha');
var jscs = require('gulp-jscs');

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

function killProcess() {
  console.log('killing server now');
  if (hadError) {
    console.log('server test error detected');
    process.exit(1);
  }
  process.exit();
}

//Any tasks added to tests:test must be added as dependencies
// in the array at the second parameter of this function
gulp.task('killserver:test', ['servertests'], function() {
  killProcess();
});

//Any tasks added to tests:build must be added as dependencies
// in the array at the second parameter of this function.  Any tasks added
// to default below should be added in the same way
gulp.task('killserver:build', ['build', 'servertests'], function() {
  killProcess();
});

gulp.task('build', ['jshint', 'jscs:warn']);

//IMPORTANT NOTE FOR CHANGES
// To prevent the server, and thus the test process, from hanging,
// any additions or removals to any of these tasks must also
// be made to the killserver:xxxx dependencies above.  Any additions to
// build do not necessitate changes, but the addition of any other
// task sequences to ANY sequence containing server tests will.
gulp.task('tests:test', ['servertests', 'killserver:test']);
gulp.task('tests:build', ['servertests', 'killserver:build']);
gulp.task('default', ['build', 'tests:build']);
