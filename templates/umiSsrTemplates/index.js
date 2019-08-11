require("regenerator-runtime/runtime");
require("./utils/setGlobal");
const Koa = require("koa");
const static = require("koa-static-router");
const Routers = require("./Routers/index");
const createProxy = require("./utils/proxy");
const logger = require("./utils/logger");
const koaBody = require("koa-body");

const app = new Koa();

// 应用级别错误
app.on("error", err => {
  logger.error(err);
});

// 处理body参数
app.use(koaBody());

// 代理转发
createProxy(app);

// 路由
Routers(app);

// 静态资源
app.use(
  static([
    {
      dir: "./static",
      router: "/static/"
    },
    {
      dir: "./web",
      router: "/web/"
    }
  ])
);

app.listen(5000, () => {
  console.log("server listening on 5000");
});
