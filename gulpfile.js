var gulp        = require('gulp');
var plumber     = require('gulp-plumber');
var browserSync = require('browser-sync').create();
var stylus      = require('gulp-stylus');
var inlineCss   = require('gulp-inline-source');

// Static Server + watching styl/html files
gulp.task('serve', ['html','stylus'], function() {

    browserSync.init({
        server: "./dest"
    });
    gulp.watch("source/*.html", ['html']);
    gulp.watch("source/*.styl", ['stylus']);
    gulp.watch("dest/*.html").on('change', browserSync.reload);
});

gulp.task('html',function() {
    return gulp.src("source/*.html")
      .pipe(plumber())
      .pipe(gulp.dest("dest/"));
});

// Compile stylus into CSS & auto-inject into browsers
gulp.task('stylus', function() {
    return gulp.src("source/styles.styl")
        .pipe(plumber())
        .pipe(stylus({
          compress: false
        }))
        .pipe(gulp.dest("dest/"))
        .pipe(browserSync.stream());
});

gulp.task('inlineCss', ['html', 'stylus'], function() {
  return gulp.src("dest/*.html")
    .pipe(plumber())
    .pipe(inlineCss({
      compress: false
    }))
    .pipe(gulp.dest("dest/"));
});

gulp.task('default', ['serve']);
