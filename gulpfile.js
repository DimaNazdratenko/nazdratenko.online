var gulp = require('gulp'),
    sass = require('gulp-sass'),
    cssnano = require("gulp-cssnano"),
    rename = require("gulp-rename");


gulp.task('css', function () {
    return gulp.src(['src/sass/*.sass', 'src/sass/*.scss'])
        .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
        .pipe(cssnano({
            zindex: false,
            discardComments: {
            removeAll: true
            }
        }))
        .pipe(rename("style.min.css"))
        .pipe(gulp.dest('src/css'))
});

gulp.task('watch', function () {
    gulp.watch(['src/sass/**/*.sass', 'src/sass/**/*.scss'], ['css']);
});

gulp.task('default', ['watch']);