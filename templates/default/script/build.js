const chalk = require("chalk");
const shell = require("shelljs");
const ENV = process.env.ENV;

if (!["test", "dev", "uat", "prod"].includes(ENV)) {
  console.log("-----------------------------------------");
  console.log(chalk.red("请传有效环境参数test或者dev或者uat或者prod"));
  console.log("-----------------------------------------");
  process.exit();
}

console.log("-----------------------------------------");
console.log(chalk.yellow(`当前打包的为${ENV}环境`));
console.log("-----------------------------------------");

shell
  .cd("web")
  .exec(
    "npm install --registry=http://nexus.ahotels.tech/repository/npm-group/ "
  )
  .exec("npm run build");
