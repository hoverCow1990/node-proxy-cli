const gulp = require("gulp");
const path = require("path");
const minimist = require("minimist");
const gulpArgv = minimist(process.argv.slice(2), {});

gulp.task("defaultTemplate", function(cb) {
  const defaultTemplatesPath = path.resolve("templates", "default", "**");
  const distPath = path.resolve(process.cwd(), gulpArgv.name);

  gulp.src(defaultTemplatesPath).pipe(gulp.dest(distPath));

  cb();
});
