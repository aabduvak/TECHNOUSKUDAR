"use strict";
const gulp        = require('gulp');
const browserSync = require('browser-sync');
const webpack = require("webpack-stream");
const sass        = require('gulp-sass');
const cleanCSS = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const rename = require("gulp-rename");
const imagemin = require('gulp-imagemin');
const jsmin = require('gulp-jsmin');
// const htmlmin = require('gulp-htmlmin');

const dist = "./dist/";

gulp.task('server', function() {

    browserSync({
        server: {
            baseDir: "dist"
        }
    });

    gulp.watch("src/*.html").on('change', browserSync.reload);
});

gulp.task("build-js", () => {
    return gulp.src("src/assets/js/main.js")
                .pipe(webpack({
                    mode: 'development',
                    output: {
                        filename: 'script.min.js'
                    },
                    watch: false,
                    devtool: "source-map",
                    module: {
                        rules: [
                          {
                            test: /\.m?js$/,
                            exclude: /(node_modules|bower_components)/,
                            use: {
                              loader: 'babel-loader',
                              options: {
                                presets: [['@babel/preset-env', {
                                    debug: true,
                                    corejs: 3,
                                    useBuiltIns: "usage"
                                }]]
                              }
                            }
                          }
                        ]
                      }
                }))
                .pipe(gulp.dest('./dist/assets/js/'))
                .on("end", browserSync.reload);
});

gulp.task("build-prod-js", () => {
    return gulp.src("src/assets/js/main.js")
                .pipe(webpack({
                    mode: 'production',
                    output: {
                        filename: 'script.min.js'
                    },
                    module: {
                        rules: [
                          {
                            test: /\.m?js$/,
                            exclude: /(node_modules|bower_components)/,
                            use: {
                              loader: 'babel-loader',
                              options: {
                                presets: [['@babel/preset-env', {
                                    corejs: 3,
                                    useBuiltIns: "usage"
                                }]]
                              }
                            }
                          }
                        ]
                      }
                }))
                .pipe(gulp.dest('./dist/assets/js/'));
});

gulp.task('styles', function() {
    return gulp.src("src/assets/sass/**/*.+(scss|sass)")
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(rename({suffix: '.min', prefix: ''}))
        .pipe(autoprefixer())
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest("dist/assets/css"))
        .pipe(browserSync.stream());
});

gulp.task('watch', function() {
    gulp.watch("src/assets/sass/**/*.+(scss|sass|css)", gulp.parallel('styles'));
    gulp.watch("src/*.html").on('change', gulp.parallel('html'));
    gulp.watch("src/assets/js/**/*.js").on('change', gulp.parallel('build-js'));
    gulp.watch("src/assets/fonts/**/*").on('all', gulp.parallel('fonts'));
    gulp.watch("src/assets/icons/**/*").on('all', gulp.parallel('icons'));
    gulp.watch("src/assets/img/**/*").on('all', gulp.parallel('images'));
});

gulp.task('html', function () {
    return gulp.src("src/*.html")
        // .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest("dist/"));
});

// gulp.task('scripts', function () {
//     return gulp.src("src/assets/js/script.js")
//         .pipe(jsmin())
//         .pipe(rename({suffix: '.min'}))
//         .pipe(gulp.dest("dist/assets/js"))
//         .pipe(browserSync.stream());
// });

gulp.task('fonts', function () {
    return gulp.src("src/assets/fonts/**/*")
        .pipe(gulp.dest("dist/assets/fonts"))
        .pipe(browserSync.stream());
});

gulp.task('icons', function () {
    return gulp.src("src/assets/icons/**/*")
        .pipe(gulp.dest("dist/assets/icons"))
        .pipe(browserSync.stream());
});

gulp.task('images', function () {
    return gulp.src("src/assets/img/**/*")
        .pipe(imagemin())
        .pipe(gulp.dest("dist/assets/img"))
        .pipe(browserSync.stream());
});

gulp.task('default', gulp.parallel('watch', 'server', 'styles', 'build-js', 'fonts', 'icons', 'html', 'images'));