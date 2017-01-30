var gulp = require('gulp');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');

var jsFiles = 'src/**',
    jsDest = 'dist/';

gulp.task('scripts', function () {
  return gulp.src(jsFiles)
      .pipe(concat('geeky.js'))
      .pipe(gulp.dest(jsDest))
      .pipe(rename('geeky.min.js'))
      .pipe(uglify())
      .pipe(gulp.dest(jsDest));
})
