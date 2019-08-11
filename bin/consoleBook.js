const chalk = require("chalk");
const unloadChar = "-";
const loadedChar = "=";

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
  },
  // 进度条
  renderProgress(text, step, rl) {
    const PERCENT = Math.round(step);
    const COUNT = 2;
    const unloadStr = new Array(COUNT * (50 - step)).fill(unloadChar).join("");
    const loadedStr = new Array(COUNT * step).fill(loadedChar).join("");
    process.stdout.write(
      `${text}:【${chalk.green(loadedStr)}${unloadStr}|${PERCENT}%】`
    );
  }
};
