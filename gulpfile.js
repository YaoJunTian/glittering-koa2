const gulp = require('gulp');
const watch = require('gulp-watch');
const babel = require('gulp-babel');
// gulp.task('gulpEjs', function () {
//   return gulp.src(['./src/web/views/**/**.ejs'])
//     .pipe(gulp.dest('build/web/views'));
// });
//库
gulp.task('library', function () {
  return gulp.src(['./src/web/public/library/**.**.**.js', './src/web/public/library/**.**.js', './src/web/public/library/**.js'])
    .pipe(gulp.dest('build/web/public/library'));
});
//头标和反爬
gulp.task('gulpCommen', function () {
  return gulp.src(['./src/web/public/favicon.ico', './src/web/public/robots.txt'])
    .pipe(gulp.dest('build/web/public'));
});
//pm2启动文件
gulp.task('gulpPm2', function () {
  return gulp.src(['./src/web/nodeuii/pm2.json'])
    .pipe(gulp.dest('build/web/nodeuii/pm2.json'));
});
// 配置上线环境
gulp.task('gulpProd', function () {
  return gulp.src(['./src/nodeuii/**/*.js', '!./src/web'])
    .pipe(babel({
      babelrc: false,
      "presets": [
        ["env", { "targets": { "node": "8.8.1" } }]
      ]
    }))
    .pipe(gulp.dest('build/nodeuii/'));
  //直接编译
});
// 配置生产环境
gulp.task('gulpDev', function () {
  return watch(['./src/nodeuii/**/*.js', '!./src/web'], { ignoreInitial: false })
    .pipe(babel({
      babelrc: false,
      "presets": [
        ["env", { "targets": { "node": "8.8.1" } }]
      ]
    }))
    .pipe(gulp.dest('build/nodeuii'));
  //监听文件变化
});
gulp.task('default', [process.env.NODE_ENV === "prod" ? 'gulpProd' : 'gulpDev', 'gulpCommen', 'gulpPm2', 'library']);
// gulp.task('default', [process.env.NODE_ENV === "prod" ? 'gulpProd' : 'gulpDev', 'gulpCommen', 'gulpPm2', 'library','gulpEjs']);