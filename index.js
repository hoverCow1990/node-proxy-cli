#!/usr/bin/env node
// 指定脚本的执行程序

// 引入依赖
const program = require("commander");
const through = require("through2");
const chalk = require("chalk");
const fs = require("fs-extra");
const path = require("path");
const inquirer = require("inquirer");
const packages = require("./package.json");
const shell = require("shelljs");

// 定义版本号以及命令选项
program
  .version(packages.version)
  .option("-v --version", "get cli version")
  .option("-i --init", "init a project");

program.parse(process.argv);

if (program.init) {
  console.log("<==================================================>");
  console.log("");
  console.log(
    chalk.white(
      "欢迎使用",
      chalk.cyanBright(" nodeProxy-cli ") + " 构建工具, 希望你拥有好心情"
    )
  );
  console.log("");
  console.log("<==================================================>");

  inquirer
    .prompt([
      {
        type: "String",
        name: "name",
        message: `${chalk.yellow("您项目的名称")}(不要全数字) :`,
        default: "oyoWork",
        validate: function(input) {
          if (/^\d+$/.test(input)) return false;

          return true;
        }
      },
      {
        type: "String",
        name: "git",
        message: chalk.yellow("您项目的git地址: ")
      },
      {
        type: "String",
        name: "distPath",
        message: chalk.yellow("您打包后静态文件目录: "),
        default: "dist"
      },
      // {
      //   type: "String",
      //   name: "branch",
      //   message: chalk.yellow("您想拉取的分支名: "),
      //   default: "master"
      // },
      {
        type: "rawlist",
        name: "type",
        message: chalk.yellow("您项目的渲染方式: "),
        choices: [
          {
            value: "static",
            name: "🐸  H5静态资源"
          },
          {
            value: "umiSsr",
            name: "🐝  umSSr渲染"
          },
          {
            value: "vueSsr",
            name: "🍎  vueSSr渲染"
          }
        ]
      }
    ])
    .then(answers => {
      const { name, git, type, distPath } = answers;
      const gulpShell = `node_modules/.bin/gulp ${type} --name ${name} --git ${git} --distPath ${distPath}`;

      shell.exec(gulpShell);

      // if (git) {
      //   shell
      //     .cd("oyoWork")
      //     .cd("web")
      //     .exec(`git clone ${git}`);
      // }

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
