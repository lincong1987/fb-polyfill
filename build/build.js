/*
 This file 'rollup.config.js' is part of Firebird Integrated Solution 1.0

 Copyright (c) 2019 Lincong

 Contact:  
        Email: lincong1987@gmail.com

        QQ: 159257119
 
 See Usage at http://www.jplatformx.com/firebird

 Create date: 2019-03-06 11:31
 */

const fs = require('fs');
const path = require('path');
const gulp = require('gulp');
const concat = require('gulp-concat');
const semi = require('gulp-semi');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');

const SRC = path.join(__dirname, '../src/libs')
const polyfillFiles = fs.readdirSync(SRC)
const preFiles = ['function.js', 'object.js']
let newOrderFiles = []
newOrderFiles = polyfillFiles.filter(file => preFiles.indexOf(file) < 0)
newOrderFiles = preFiles.concat(newOrderFiles)
let libs = newOrderFiles.map(file => path.join(SRC, file));
let log = console.log.bind(console);

let task = () => {

    log("开始合并压缩任务");

    gulp.src(libs)
        .pipe(semi.add({ leading: true }))
        .pipe(concat('polyfill.js'))
        .pipe(gulp.dest(path.join(__dirname, '../dist')))
        .pipe(uglify({

            compress: {
                warnings: false,
                // see https://github.com/ecomfe/edp/issues/230
                conditionals: false,
                properties: false,
            },
            mangle: {
                reserved: ['require', 'exports', 'module'],
            },
            output: {
                quote_keys: true
            },
            sourceMap: {},
            ie8: true

            //   beautify: false,
            //   mangle: {
            //     screw_ie8: false,
            //     keep_fnames: true,
            //     properties: false,
            //     keep_quoted: true
            //   },
            //   compress: {
            //     warnings: false,
            //     screw_ie8: false,
            //     properties: false
            //   },
            //   output: {
            //     keep_quoted_props: true
            //   },
            //   comments: false
        }))
        .pipe((() => {
            return rename({
                basename: 'polyfill.min'
            })
        })())
        .pipe(gulp.dest(path.join(__dirname, '../dist')))
        .on('error', function (err) {
            log('Gulp Error!', err.message);
            //this.end();
        });

    log("完成合并压缩任务");
};

task();

let watcher = gulp.watch(libs);

log("开始监听文件变化");
watcher.on('change', function (path, stats) {
    console.log(`文件 ${path} 被修改`);
    task();
});


