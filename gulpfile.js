var source = require('vinyl-source-stream');
var gulp = require('gulp');
var gutil = require('gulp-util');
var browserify = require('browserify');
var reactify = require('reactify');
var watchify = require('watchify');
var notify = require("gulp-notify");
 
var scriptsDir = './client';
var buildDir = './build';
 
function createBundle(file, watch) { 
  var props = watchify.args;
  props.entries = [scriptsDir + '/' + file];
  props.debug = true;
  
  var bundler = watch ? watchify(browserify(props)) : browserify(props);
  
  bundler.transform(reactify);

  return bundler;
}


function rebundle (bundler) {
    gutil.log("Rebundle "+bundler.file);
    var stream = bundler.bundle();
    return stream.on('error', notify.onError({
        title: "Compile Error",
        message: "<%= error.message %>"
      }))
      .pipe(source(bundler.file))
      .pipe(gulp.dest(buildDir + '/'));
}

function buildScript(files, watch) {
  var publicBundle = createBundle(files[0], watch);
  publicBundle.file = files[0];
  publicBundle.on('update', function() {
    rebundle(publicBundle);
  });

  var publicStream = rebundle(publicBundle);

  return publicStream;
}
 
 
gulp.task('build', function() {
  return buildScript(['app.js'], false);
});
 
 
gulp.task('watch', function() {
  return buildScript(['app.js'], true);
});