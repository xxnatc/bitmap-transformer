var gulp = require('gulp');
var eslint = require('gulp-eslint');
var jshint = require('gulp-jshint');
var mocha = require('gulp-mocha');
var stylish = require('jshint-stylish');


var files = ['**/*.js','!node_modules/**','test/*.js'];

gulp.task('jshint', function() {
  return gulp.src(files)
    .pipe(jshint())
    .pipe(jshint.reporter(stylish));
});

gulp.task('test', function() {
  return gulp.src('./test/test.js',{read: false})
          .pipe(mocha());
});

gulp.task('default',['jshint','test']);
