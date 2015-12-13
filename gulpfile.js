var paths = {
 scripts: ['app/scripts/**/*.js'],
 html: ['app/index.html', '!app/test.html'], 
 dist: 'dist'
};

var gulp = require("gulp");
var browserSync = require('browser-sync').create();


// Include Our Plugins
var babel = require("gulp-babel");

gulp.task("babel", function () {
  return gulp.src(paths.scripts)
    .pipe(babel({
        presets: ['es2015']
    }))
    .pipe(gulp.dest(paths.dist));
});

gulp.task("dist", function () {
  gulp.src(paths.html)
    .pipe(gulp.dest(paths.dist));
});

// Static Server + watching scss/html files
gulp.task('serve', ['babel'], function() {

    browserSync.init({
        server: paths.dist
    });

    gulp.watch(paths.scripts, ['babel']);
    gulp.watch(paths.html, ['dist']).on('change', browserSync.reload);
});

// Default Task
gulp.task('default', ['dist', 'serve']);

