#!/usr/bin/env node
//这里需要声明文件运行环境
const program = require("commander");

// 定义版本和参数选项
program
  .version("0.1.0", "-v, --version")
  .option("-i, --init", "init something")
  .option("-g, --generate", "generate something")
  .option("-r, --remove", "remove something")
  .option("-b, --bb", "hheehe");

// 必须在.parse()之前，因为node的emit()是即时的
program.on("--help", function() {
  console.log("  Examples:");
  console.log("");
  console.log("    this is an example");
  console.log("");
});

program.parse(process.argv);

if (program.init) {
  console.log("init something");
}

if (program.generate) {
  console.log("generate something");
}

if (program.remove) {
  console.log("remove something");
}

if (program.bb) {
  console.log("remove lalala");
}
