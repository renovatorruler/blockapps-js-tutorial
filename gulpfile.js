var gulp = require("gulp");
var browserSync = require('browser-sync').create();


// Include Our Plugins
var babel = require("gulp-babel");

gulp.task("babel", function () {
  return gulp.src("app/scripts/app.es6.js")
    .pipe(babel());
});

// Static Server + watching scss/html files
gulp.task('serve', ['babel'], function() {

    browserSync.init({
        server: "./app"
    });

    gulp.watch("app/*.html").on('change', browserSync.reload);
    gulp.watch("app/*.html").on('change', browserSync.reload);
});

// Default Task
gulp.task('default', ['serve']);

