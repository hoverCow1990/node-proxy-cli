const chalk = require("chalk");

module.exports = {
  // 起始招呼
  hello: function() {
    console.log("");
    console.log("");
    console.log(" =======================================================");
    console.log(` |                                                     |`);
    console.log(
      chalk.white(` |    欢迎使用`),
      chalk.cyanBright(" node-proxy-cli ") + " 构建工具,",
      chalk.yellow("祝你好运"),
      " -------  么么哒 😘"
    );
    console.log(` |                                                     |`);
    console.log(" =======================================================");
    console.log("");
    console.log("");
  }
};
