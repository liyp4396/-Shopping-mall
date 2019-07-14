'use strict';
 
var gulp = require('gulp');
var sass = require('gulp-sass');
 
gulp.task('sass', function () {
    console.log('sass is running...');
  return gulp.src('./src/sass/**/*.scss')
    .pipe(sass({outputStyle: 'expanded'})).on('error', function() {}).pipe(gulp.dest('./src/css'));
});

 //创建gulp监听任务：sass:watch
gulp.task('sass:watch', function () {
  console.log('watch is running');
  gulp.watch('./src/sass/**/*.scss', ['sass']);
});

// gulp.task('dev', function () {
//   gulp.watch('./src/sass/**/*.scss', ['style:dev']);
// });

//gulp的默认任务
gulp.task('default',['sass:watch'], function(){
    console.log('default is running');
});