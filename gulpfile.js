var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');

var paths = {
    sass: ['./scss/*.scss']
};

gulp.task('sass', function(done) {
    gulp.src('./scss/style.scss')
        .pipe(sass({ errLogToConsole: true, sourceComments: 'map' }))
        .pipe(gulp.dest('./'))
        .on('end', done);
});

gulp.task('watch', function() {
    gulp.watch(paths.sass, ['sass']);
});
