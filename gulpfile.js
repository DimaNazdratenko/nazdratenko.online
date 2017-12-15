let gulp = require('gulp'),
    pug = require('gulp-pug'),
    sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    sort = require('gulp-sort'),
    plumber = require('gulp-plumber'),
    prefix = require('gulp-autoprefixer'),
    imagemin = require('gulp-imagemin'),
    browserSync = require('browser-sync').create(),
    ftp = require('vinyl-ftp'),
    notify = require('gulp-notify');

let paths = {
    blocks: 'blocks/',
    devDir: 'app/',
    root: './'
};

/**********************************
 Developer tasks
 **********************************/

//pug compile
gulp.task('pug', function () {
    return gulp.src([paths.blocks + '*.pug', '!' + paths.blocks + 'template.pug'])
        .pipe(plumber())
        .pipe(pug({pretty: true}))
        .pipe(gulp.dest(paths.devDir))
        .pipe(browserSync.stream());
});

//sass compile
gulp.task('sass', function () {
    return gulp.src([paths.blocks + '*.sass', paths.blocks + '*.scss'])
        .pipe(plumber())
        .pipe(sass().on('error', sass.logError))
        .pipe(prefix({
            browsers: ['last 3 versions'],
            cascade: true
        }))
        .pipe(gulp.dest(paths.devDir + 'css/'))
        .pipe(browserSync.stream());
});

//js compile
gulp.task('js', function () {
    return gulp.src([paths.blocks + '**/*.js', '!' + paths.blocks + 'game/**/*.js'])
        .pipe(sort())
        .pipe(concat('main.js'))
        .pipe(gulp.dest(paths.devDir + 'js/'))
        .pipe(browserSync.stream());
});

gulp.task('game', function () {
    return gulp.src([paths.blocks + 'game/*.js'])
        .pipe(sort())
        .pipe(concat('game.js'))
        .pipe(gulp.dest(paths.devDir + 'js/'))
        .pipe(browserSync.stream());
});

//watch
gulp.task('watch', function () {
    gulp.watch(paths.blocks + '**/*.pug', ['pug']);
    gulp.watch([paths.blocks + '**/*.sass', paths.blocks + '**/*.scss'], ['sass']);
    gulp.watch([paths.blocks + '**/*.js', '!' + paths.blocks + 'game/**/*.js'], ['js']);
    gulp.watch(paths.blocks + 'game/**/*.js', ['game']);
});

//server
gulp.task('browser-sync', function () {
    browserSync.init({
        // browser: "google chrome",
        port: 3000,
        server: {
            baseDir: paths.root
        }
    });
});

//img min
gulp.task('img', function () {
    return gulp.src('assets/img_big/**/*.*')
        .pipe(imagemin())
        .pipe(gulp.dest('assets/images'))
});

//ftp
gulp.task('send', function () {
    let conn = ftp.create({
        host: 'files.000webhost.com',
        user: 'nazdratenko',
        password: 'T9rquxhb',
        parallel: 5
    });

    /* list all files you wish to ftp in the glob variable */
    let globs = [
        'app/**/*',
        '!node_modules/**' // if you wish to exclude directories, start the item with an !
    ];

    return gulp.src(globs, {base: '.', buffer: false})
        .pipe(conn.newer('/')) // only upload newer files
        .pipe(conn.dest('/public_html'))
        .pipe(notify("Dev site updated!"));
});

//default
gulp.task('default', ['browser-sync', 'watch', 'pug', 'sass', 'js', 'game']);