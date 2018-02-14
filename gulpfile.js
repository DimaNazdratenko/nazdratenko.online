let gulp = require('gulp'),
    pug = require('gulp-pug'),
    sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    sort = require('gulp-sort'),
    plumber = require('gulp-plumber'),
    prefix = require('gulp-autoprefixer'),
    imagemin = require('gulp-imagemin'),
    uglify = require('gulp-uglify'),
    uglifyES6 = require('gulp-uglify-es').default,
    browserSync = require('browser-sync').create();

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
    return gulp.src([paths.blocks + '**/*.js', '!' + paths.blocks + 'game/**/*.js', '!' + paths.blocks + 'birds/**/*.js'])
        .pipe(sort())
        .pipe(uglifyES6())
        .on('error', function(err) {
            console.error('Error in compress task', err.toString());
        })

        .pipe(concat('main.min.js'))
        .pipe(gulp.dest(paths.devDir + 'js/'))
        .pipe(browserSync.stream());
});

gulp.task('dependencies', function () {
    return gulp.src(['node_modules/jquery/dist/jquery.min.js', 'node_modules/popper.js/dist/umd/popper.min.js', 'node_modules/bootstrap/dist/js/bootstrap.min.js'])
        .pipe(concat('dependencies.min.js'))
        .pipe(gulp.dest(paths.devDir + 'js/'))
});

gulp.task('pixi', function () {
    return gulp.src(['node_modules/pixi.js/dist/pixi.min.js'])
        .pipe(concat('pixi.min.js'))
        .pipe(gulp.dest(paths.devDir + 'js/'))
});

gulp.task('three', function () {
    return gulp.src(['node_modules/three/build/three.min.js'])
        .pipe(concat('three.min.js'))
        .pipe(gulp.dest(paths.devDir + 'js/'))
});

gulp.task('threeAdditional', function () {
    return gulp.src([paths.blocks + 'birds/*.js', '!' + paths.blocks + 'birds/movement.js', '!' + paths.blocks + 'birds/birds.js'])
        .pipe(sort())
        .pipe(uglify())
        .pipe(concat('threeAdditional.min.js'))
        .pipe(gulp.dest(paths.devDir + 'js/'))
});

gulp.task('movement', function () {
    return gulp.src([paths.blocks + 'birds/movement.js'])
        .pipe(uglify())
        .pipe(concat('movement.min.js'))
        .pipe(gulp.dest(paths.devDir + 'js/'))
});

gulp.task('birds', function () {
    return gulp.src([paths.blocks + 'birds/birds.js'])
        .pipe(uglify())
        .pipe(concat('birds.min.js'))
        .pipe(gulp.dest(paths.devDir + 'js/'))
});

gulp.task('howler', function () {
    return gulp.src(['node_modules/howler/dist/howler.min.js'])
        .pipe(concat('howler.min.js'))
        .pipe(gulp.dest(paths.devDir + 'js/'))
});

gulp.task('game', function () {
    return gulp.src([paths.blocks + 'game/*.js'])
        .pipe(sort())
        .pipe(uglifyES6())
        .pipe(concat('game.min.js'))
        .pipe(gulp.dest(paths.devDir + 'js/'))
        .pipe(browserSync.stream());
});

//server
gulp.task('browser-sync', function () {
    browserSync.init({
        browser: "google chrome",
        port: 3000,
        server: {
            baseDir: paths.devDir
        }
    });
});

//img min
gulp.task('img', function () {
    return gulp.src('app/assets/img_big/**/*.*')
        .pipe(imagemin())
        .pipe(gulp.dest('app/assets/images'))
});

//watch
gulp.task('watch', function () {
    gulp.watch(paths.blocks + '**/*.pug', ['pug']);
    gulp.watch([paths.blocks + '**/*.sass', paths.blocks + '**/*.scss'], ['sass']);
    gulp.watch([paths.blocks + '**/*.js', '!' + paths.blocks + 'game/**/*.js', '!' + paths.blocks + 'birds/**/*.js'], ['js']);
    gulp.watch(paths.blocks + 'game/**/*.js', ['game']);
});

//default
gulp.task('default', ['browser-sync', 'watch', 'pug', 'sass', 'js', 'dependencies', 'pixi', 'three', 'threeAdditional', 'movement', 'birds', 'howler', 'game']);