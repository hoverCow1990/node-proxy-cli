const gulp = require("gulp");
const path = require("path");
const minimist = require("minimist");
const fileUtil = require("../../utils/files");
const rename = require("gulp-rename");
const replace = require("gulp-replace");
const gulpSequence = require("gulp-sequence");
const shell = require("shelljs");
const gulpArgv = minimist(process.argv.slice(2), {});

module.exports = function(templatesPath, routerPath) {
  // staticRouters需要的文件
  gulp.task("staticRouterFiles", function(cb) {
    gulp
      .src(path.join(templatesPath, "staticRender", "**"))
      .pipe(gulp.dest(path.join(routerPath, "staticRender")))
      .on("end", function() {
        cb();
      });
  });
};
