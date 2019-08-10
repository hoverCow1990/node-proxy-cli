const ssrRouters = require("./ssrRoutes.js");
const ENV = require("../../constants/ENV.js");
const isDev = ENV.NODE_ENV === "development";

function getUrlCookie(ctx) {
  const query = ctx.request.query;

  return query.ticket;
}

class SsrRender {
  constructor(router) {
    this.router = router;
  }

  install() {
    this.checkTicket();
    this.render();
  }

  checkTicket() {
    this.router.get(ssrRouters, async (ctx, next) => {
      // const ticket = getUrlCookie(ctx);

      // if (ticket) {
      //   ctx.cookies.set("nodeTicket", ticket, {
      //     httpOnly: false,
      //     overwrite: false
      //   });
      // }

      // ctx.ticket = ticket;

      await next();
    });
  }

  render() {
    this.router.get(ssrRouters, async (ctx, next) => {
      try {
        console.log("进入页面渲染");
        console.log("ctx.path", ctx.path);
        global.self = global.window;

        if (isDev) {
          delete require.cache[
            require.resolve("../../web/{{{ dist }}}/umi.server.js")
          ];
        }
        const serverRender = require("../../web/{{{ dist }}}/umi.server.js");

        const { ReactDOMServer } = serverRender;
        const {
          htmlElement,
          rootContainer,
          g_initialData
        } = await serverRender.default({
          req: {
            url: ctx.path
          }
        });

        const stream = await ReactDOMServer.renderToString(htmlElement);

        ctx.type = "text/html";
        ctx.status = 200;
        ctx.body = stream.startsWith("<!DOCTYPE HTML>")
          ? stream
          : `<!DOCTYPE HTML>
        ${stream}`;
      } catch (error) {
        console.log("error", error);
      }

      // 3002未登陆状态
      // if (g_initialData && g_initialData.redirect_url && !ctx.ticket) {
      //   console.log(`跳转至${g_initialData.redirect_url}`)
      //   ctx.redirect(g_initialData.redirect_url)
      // } else {
      //   const stream = await ReactDOMServer.renderToNodeStream(htmlElement)

      //   ctx.type = 'text/html'
      //   ctx.status = 200
      //   ctx.body = stream
      // }
    });
  }
}

module.exports = SsrRender;
