const chalk = require("chalk");

module.exports = [
  {
    type: "String",
    name: "name",
    message: `${chalk.yellow("您项目的名称")}(不要全数字) :`,
    default: "oyo-work",
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
  },
  {
    type: "String",
    name: "devScript",
    message: `${chalk.yellow("您项目启动dev的命令是")} :`,
    default: "npm run dev"
  },
  {
    type: "String",
    name: "testScript",
    message: `${chalk.yellow("您项目启动test的命令是")} :`,
    default: "npm run test"
  }
];
