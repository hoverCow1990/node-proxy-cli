const gulp = require("gulp");
const path = require("path");
const rename = require("gulp-rename");
const replace = require("gulp-replace");
const shell = require("shelljs");
var git = require("gulp-git");

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
          .pipe(replace(/{{{ npm run dev }}}/g, gulpArgv.devScript))
          .pipe(replace(/{{{ npm run test }}}/g, gulpArgv.testScript))
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

  // routers目录
  gulp.task("buildScript", function(cb) {
    const scriptPath = path.join(distPath, "script");

    gulp
      .src(path.join(scriptPath, "build.js"))
      .pipe(replace(/{{{ npm run build }}}/g, gulpArgv.buildScript))
      .pipe(gulp.dest(scriptPath))
      .on("end", function() {
        cb();
      });
  });

  gulp.task("git", function(cb) {
    if (!gulpArgv.git) {
      shell.cd(distPath).exec("mkdir web");

      return cb();
    }

    shell
      .cd(distPath)
      .exec(`git init`)
      .exec(`git clone ${gulpArgv.git} web`);

    // 删除web下git文件
    // del([path.join(webPath, ".git")]);

    cb();
  });

  gulp.task("installNode", function(cb) {
    if (!gulpArgv.install) return cb();

    shell.cd(distPath).exec("npm install -d");

    cb();
  });

  gulp.task("installWeb", function(cb) {
    if (!gulpArgv.install) return cb();

    shell.cd(path.join(distPath, "web")).exec("npm install -d");

    cb();
  });
};
