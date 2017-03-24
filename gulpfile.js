/*
This file is the main entry point for defining Gulp tasks and using Gulp plugins.
Click here to learn more. https://go.microsoft.com/fwlink/?LinkId=518007
*/

var gulp = require('gulp');

var libs = './src/lib/';

gulp.task('default', function () {
    // place code for your default task here
});

gulp.task('restore:bootstrap', function () {
    gulp.src([
        'node_modules/bootstrap/dist/**/*.*'
    ]).pipe(gulp.dest(libs + 'bootstrap'));
});

gulp.task('restore:font-awesome', function () {
    gulp.src([
        'node_modules/font-awesome/css/*.*'
    ]).pipe(gulp.dest(libs + 'font-awesome/css'));

    gulp.src([
        'node_modules/font-awesome/fonts/*.*'
    ]).pipe(gulp.dest(libs + 'font-awesome/fonts'));
});

gulp.task('restore', [
    'restore:bootstrap',
    'restore:font-awesome'
]);