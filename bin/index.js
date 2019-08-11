#!/usr/bin/env node
// 指定脚本的执行程序

// 引入依赖
const program = require("commander");
const chalk = require("chalk");
const path = require("path");
const inquirer = require("inquirer");
const packages = require("../package.json");
const shell = require("shelljs");
const consoleBook = require("./consoleBook.js");
const questions = require("./questions.js");

// 定义版本号以及命令选项
program
  .version(packages.version)
  .option("-v --version", "output the version number")
  .option("-i --init", "init a project");

program.parse(process.argv);

if (program.init) {
  consoleBook.hello();

  inquirer.prompt(questions).then(answers => {
    const { name, git, type, distPath, devScript, testScript } = answers;
    const productPath = path.join(__dirname, "../");
    const query = {
      name,
      git,
      distPath,
      cwd: process.cwd(),
      gulpfile: path.join(productPath, "gulpfile.js"),
      devScript: `"${devScript}"`,
      testScript: `"${testScript}"`
    };
    const queryStr = Object.entries(query)
      .map(([key, val]) => {
        return val ? ` --${key} ${val}` : "";
      })
      .join("");

    const gulpShell = `${productPath}/node_modules/.bin/gulp ${type} ${queryStr}`;
    console.log(queryStr);
    shell.exec(gulpShell);

    console.log("结果为:");
    console.log(answers);
  });
}

// if (program.init) {
// // 获取将要构建的项目根目录
// var projectPath = path.resolve(program.init);
// // 获取将要构建的的项目名称
// var projectName = path.basename(projectPath);
// console.log(projectPath, projectName);
// console.log(`Start to init a project in ${chalk.green(projectPath)}`);
// // 根据将要构建的项目名称创建文件夹
// fs.ensureDirSync(projectName);
// // 获取本地模块下的demo1目录
// var cwd = path.join(__dirname, "./templates");
// console.log(cwd);
// // 从demo1目录中读取除node_modules目录下的所有文件并筛选处理
// vfs
//   .src(["**/*", "!node_modules/**/*"], { cwd: cwd, dot: true })
//   .pipe(
//     through.obj(function(file, enc, callback) {
//       if (!file.stat.isFile()) {
//         return callback();
//       }
//       this.push(file);
//       return callback();
//     })
//   )
//   // 将从demo1目录下读取的文件流写入到之前创建的文件夹中
//   .pipe(vfs.dest(projectPath))
//   .on("end", function() {
//     console.log("Installing packages...");
//     // 将node工作目录更改成构建的项目根目录下
//     process.chdir(projectPath);
//     // 执行安装命令
//     require("./lib/install");
//   })
//   .resume();
// }

// const unloadChar = "-";
// const loadedChar = "=";

// if (program.gg) {
//   rl.question("项目名称?", answer => {
//     console.log(answer);
//     let i = 0;
//     let time = setInterval(() => {
//       console.log(i);
//       if (i > 100) {
//         clearInterval(time);
//         readline.cursorTo(process.stdout, 0, 0);
//         readline.clearScreenDown(process.stdout);
//         console.log(`hello ${answer}`);
//         process.exit(0);
//         return;
//       }
//       readline.cursorTo(process.stdout, 0, 1);
//       readline.clearScreenDown(process.stdout);
//       renderProgress("saying hello", i);
//       i++;
//     }, 200);
//   });
// }

// function renderProgress(text, step) {
//   const PERCENT = Math.round(step);
//   const COUNT = 2;
//   const unloadStr = new Array(COUNT * (100 - step)).fill(unloadChar).join("");
//   const loadedStr = new Array(COUNT * step).fill(loadedChar).join("");
//   process.stdout.write(
//     `${text}:【${chalk.green(loadedStr)}${unloadStr}|${PERCENT}%】`
//   );
// }
