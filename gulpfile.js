(function () {
  'use strict';

  var gulp = require('gulp');
  var jade = require('gulp-jade');
  var usemin = require('gulp-usemin');
  var connect = require('gulp-connect');
  var runSequence = require('run-sequence');
  var clean = require('gulp-clean');

  gulp.task('jade', function () {
    return gulp.src('app/**/*.jade')
      .pipe(jade({pretty: true}))
      .pipe(gulp.dest('dist'))
      .pipe(connect.reload());
  });

  gulp.task('js', function () {
    return gulp.src('app/**/*.js')
      .pipe(gulp.dest('dist'))
      .pipe(connect.reload());
  });

  gulp.task('css', function () {
    return gulp.src('app/**/*.css')
      .pipe(gulp.dest('dist'))
      .pipe(connect.reload());
  });

  gulp.task('usemin', function () {
    return gulp.src('dist/**/*.html')
      .pipe(usemin({
        css: [],
        js: []
      }))
      .pipe(gulp.dest('dist'));
  });

  gulp.task('connect', function () {
    return connect.server({
      root: 'dist',
      port: 8080,
      livereload: true
    });
  });

  gulp.task('clean', function () {
    return gulp.src(['dist'], {read: false})
      .pipe(clean());
  });

  gulp.task('clean-dist-bower', function () {
    return gulp.src(['dist/bower_components'], {read: false})
      .pipe(clean());
  });

  gulp.task('watch', function () {
    gulp.watch(['app/**/*.jade'], ['jade']);
  });

  gulp.task('build', ['jade', 'js', 'css']);
  gulp.task('dist', function (callback) {
    runSequence('build', 'usemin', 'clean-dist-bower', callback);
  });
  gulp.task('default', ['build', 'connect', 'watch']);
})();