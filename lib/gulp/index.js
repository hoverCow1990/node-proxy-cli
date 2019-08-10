const gulp = require("gulp");
const path = require("path");
const minimist = require("minimist");
const fileUtil = require("../../utils/files");
const gulpSequence = require("gulp-sequence");
const defaultTask = require("./defaultTask");
const staticTask = require("./staticTask");
const umiSsrTask = require("./umiSsrTask");
const gulpArgv = minimist(process.argv.slice(2), {});

// 基础目录
const defaultTemplatesPath = path.resolve("templates", "default", "**");
// dist目录 根据用户输入的项目名生成
const filePath = path.resolve(process.cwd(), gulpArgv.name);
// 防止该目录下已经存在重名 重复会依次-1-2堆叠
const distPath = fileUtil.getFileName(filePath);
// 渲染路径
const routerPath = path.join(distPath, "Routers");
// 根据umissr还是静态文件选择对应的模版
const templatesPath = path.resolve("templates", `${gulpArgv._[0]}Templates`);

defaultTask(
  defaultTemplatesPath,
  distPath,
  templatesPath,
  routerPath,
  gulpArgv
);
staticTask(templatesPath, routerPath);
umiSsrTask(templatesPath, routerPath, gulpArgv);

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

gulp.task("vueSsr", function() {
  console.log("sorry, 暂不支持 等待后续更新!!!");
});
