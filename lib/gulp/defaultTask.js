const gulp = require("gulp");
const path = require("path");
const rename = require("gulp-rename");
const replace = require("gulp-replace");
const shell = require("shelljs");

module.exports = function(
  defaultTemplatesPath,
  distPath,
  templatesPath,
  routerPath,
  gulpArgv
) {
  // 基础模版
  gulp.task("defaultTemplate", function(cb) {
    gulp
      .src(defaultTemplatesPath)
      .pipe(gulp.dest(distPath))
      .on("end", function() {
        const packageJsonPath = path.join(distPath, "package.json");

        gulp
          .src(packageJsonPath)
          .pipe(replace(/{{{ name }}}/g, gulpArgv.name))
          .pipe(gulp.dest(distPath))
          .on("end", function() {
            cb();
          });
      });
  });

  // 主要index.js
  gulp.task("index", function(cb) {
    gulp
      .src(path.join(templatesPath, "index.js"))
      .pipe(replace(/{{{ dist }}}/g, gulpArgv.distPath))
      .pipe(gulp.dest(distPath))
      .on("end", function() {
        cb();
      });
  });

  // routers目录
  gulp.task("routerIndex", function(cb) {
    gulp
      .src(path.join(templatesPath, "routerIndex.js"))
      .pipe(rename("index.js"))
      .pipe(gulp.dest(routerPath))
      .on("end", function() {
        cb();
      });
  });

  gulp.task("git", function(cb) {
    if (!gulpArgv.git) cb();

    shell
      .cd(distPath)
      .exec(`git init`)
      .exec(`git clone ${gulpArgv.git} web`);

    // 删除web下git文件
    // del([path.join(webPath, ".git")]);

    cb();
  });
};