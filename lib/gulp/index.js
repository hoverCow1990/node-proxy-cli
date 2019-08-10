const gulp = require("gulp");
const path = require("path");
const minimist = require("minimist");
const fileUtil = require("../../utils/files");
const rename = require("gulp-rename");
const replace = require("gulp-replace");
const gulpSequence = require("gulp-sequence");
const shell = require("shelljs");
const gulpArgv = minimist(process.argv.slice(2), {});
const del = require("del");

// 基础目录
const defaultTemplatesPath = path.resolve("templates", "default", "**");
// dist目录 根据用户输入的项目名生成
const filePath = path.resolve(process.cwd(), gulpArgv.name);
// 防止该目录下已经存在重名 重复会依次-1-2堆叠
const distPath = fileUtil.getFileName(filePath);
// 渲染路径
const routerPath = path.join(distPath, "Routers");
// routerTemplate
const templatesPath = path.resolve("templates", `${gulpArgv._[0]}Templates`);
// routerPath
const webPath = path.join(distPath, "web");

// 基础模版
gulp.task("defaultTemplate", function(cb) {
  gulp
    .src(defaultTemplatesPath)
    .pipe(gulp.dest(distPath))
    .on("end", function() {
      cb();
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

// staticRouters需要的文件
gulp.task("staticRouterFiles", function(cb) {
  gulp
    .src(path.join(templatesPath, "staticRender", "**"))
    .pipe(gulp.dest(path.join(routerPath, "staticRender")))
    .on("end", function() {
      cb();
    });
});

// routers需要的文件
gulp.task("umiSsrRouterFiles", function(cb) {
  const umiSsrDistPath = path.join(routerPath, "umiSsrRender");
  const umiSsrIndexPath = path.join(umiSsrDistPath, "index.js");

  gulp
    .src(path.join(templatesPath, "umiSsrRender", "**"))
    .pipe(gulp.dest(umiSsrDistPath))
    .on("end", function() {
      gulp
        .src(umiSsrIndexPath)
        .pipe(replace(/{{{ dist }}}/g, gulpArgv.distPath))
        .pipe(gulp.dest(umiSsrDistPath))
        .on("end", function() {
          cb();
        });
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

gulp.task(
  "static",
  gulpSequence(
    "defaultTemplate",
    "index",
    "routerIndex",
    "staticRouterFiles",
    "git"
  )
);

gulp.task(
  "umiSsr",
  gulpSequence(
    "defaultTemplate",
    "index",
    "routerIndex",
    "umiSsrRouterFiles",
    "git"
  )
);

gulp.task(
  "vueSsr",
  gulpSequence("defaultTemplate", "index", "routerIndex", "git")
);
