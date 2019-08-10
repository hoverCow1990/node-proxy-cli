const gulp = require("gulp");
const path = require("path");
const replace = require("gulp-replace");

module.exports = function(templatesPath, routerPath, gulpArgv) {
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
};
