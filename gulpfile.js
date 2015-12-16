var gulp = require("gulp");
var gutil = require("gulp-util");
var webpack = require("webpack");
var WebpackDevServer = require("webpack-dev-server");

var paths = {
 scripts: ['app/scripts/**/*.js'],
 html: ['app/index.html', '!app/test.html'], 
 dist: 'dist'
};

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

gulp.task("webpack", function(callback) {
    // run webpack
    webpack({
        // configuration
        context: __dirname + "/app",
        entry: {
            app: './client/index.js'
        },
        output: {
            path: __dirname + "/dist",
            filename: "application.bundle.js"
        },
        module: {
            preLoaders: [
                {test: /\.js$/, loader: 'eslint-loader', exclude: nodeModulesDir}
            ],
            loaders: [
                {test: /\.js$/, loader: 'babel-loader!eslint-loader', exclude: nodeModulesDir}, // keep node modules out of here or it gets really slow.
                {test: /\.css$/, loader: 'style-loader!css-loader'},
                {test: /\.html$/, loader: 'ngtemplate!html-loader', exclude: nodeModulesDir},
                {test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192' } // inline base64 URLs for <=8k images, direct URLs for the rest
            ]
        }
    }, function(err, stats) {
        if(err) throw new gutil.PluginError("webpack", err);
        gutil.log("[webpack]", stats.toString({
            // output options
        }));
        callback();
    });
});


// Static Server + watching scss/html files
gulp.task('serve', ['babel'], function() {

    gulp.watch(paths.scripts, ['babel']);
    gulp.watch(paths.html, ['dist']);
});

// Default Task
gulp.task('default', ['dist', 'serve']);

