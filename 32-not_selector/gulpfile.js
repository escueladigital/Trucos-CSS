const gulp = require('gulp'),
      sass = require('gulp-sass'),
      jade = require('gulp-jade'),
      autoprefixer = require('gulp-autoprefixer'),
      browserSync = require('browser-sync').create();

gulp.task('sass',() =>
  gulp.src('./dev/styles.scss')
      .pipe(sass().on('error', sass.logError))
      .pipe(autoprefixer({
        browsers: ['last 2 versions']
      }))
      .pipe(gulp.dest('./'))
      .pipe(browserSync.stream())
);

gulp.task('jade', () =>
  gulp.src('./dev/index.jade')
      .pipe(jade({
        pretty: true
      }))
      .pipe(gulp.dest('./'))
      .on('end', browserSync.reload)
);

gulp.task('default', () =>{
  browserSync.init({
    server : './'
  });
  gulp.watch('./dev/styles.scss', ['sass']);
  gulp.watch('./dev/index.jade', ['jade']);
});