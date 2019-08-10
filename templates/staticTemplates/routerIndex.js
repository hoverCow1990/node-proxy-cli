const staticRender = require("./staticRender/index.js");
const ping = require("./ping/index.js");
const Router = require("koa-router");

const routerList = [ping, staticRender];

function Routers(app) {
  var router = new Router();

  routerList.forEach(routerModule => {
    new routerModule(router).install();
  });

  app.use(router.routes()).use(router.allowedMethods());
}

module.exports = Routers;
