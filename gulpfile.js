var gulp = require('gulp');

var postcss = require('gulp-postcss');
var precss = require('precss');
var cssnext = require('postcss-cssnext');

gulp.task('stylesheets', function() {
  var processors = [
    precss(),
    cssnext({
      browsers: [
        '> 1%',
        'last 2 versions',
        'Firefox ESR',
        'Opera 12.1'
      ]
    })
  ];
  return gulp.src('./assets/stylesheets/style.css')
    .pipe(postcss(processors))
    .pipe(gulp.dest('./public/stylesheets'));
});

gulp.task('default', ['stylesheets'], function() {
  gulp.watch('./assets/stylesheets/**/*.css', ['stylesheets']);
});
