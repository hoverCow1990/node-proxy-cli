const httpProxyMiddleware = require("http-proxy-middleware");
const koaConnect = require("koa2-connect");
const getProxyConfig = require("../constants/ProxyConfig");
const logger = require("./logger");
const ENV = require("../constants/ENV");
const querystring = require("querystring");
const ContentType = require("../constants/ContentType");

// 处理非200状态码
const getErrHandler = (ctx, next) => async (proxyRes, req, res) => {
  try {
    // 处理非200status的请求 记录下相关上行的参数
    if (proxyRes.statusCode !== 200) {
      const errData = {
        code: proxyRes.statusCode,
        url: ctx.url,
        headers: ctx.request.headers,
        query: ctx.request.query,
        method: req.method
      };

      errData.query = ctx.request.query;

      if (req.method.toUpperCase() === "POST") {
        errData.reqType = ctx.reqType;
        errData.reqData =
          errData.reqType === "text"
            ? JSON.parse(ctx.request.body)
            : ctx.request.body;
      }

      logger.error(errData);
    }
  } catch (e) {
    console.log(e);
  }
};

// 代理兼容封装
const proxy = function(context, options) {
  if (typeof options === "string") {
    options = {
      target: options
    };
  }

  return async function(ctx, next) {
    await koaConnect(
      httpProxyMiddleware(context, {
        ...options,
        onProxyRes: getErrHandler(ctx, next),
        onError: function(err, req, res) {
          console.log(err);
        },
        // 该处解决koaBody和createProxy的冲突问题
        // 在请求发出前拦截处理
        onProxyReq: async (proxyReq, req, res) => {
          const writeBody = bodyData => {
            proxyReq.setHeader("Content-Length", Buffer.byteLength(bodyData));
            proxyReq.write(bodyData);
          };

          if (ctx.request.is(ContentType.textTypes)) {
            ctx.reqType = "text";
            return writeBody(JSON.stringify(ctx.request.body));
          }

          if (ctx.request.is(ContentType.formTypes)) {
            ctx.reqType = "form";
            return writeBody(querystring.stringify(ctx.request.body));
          }

          ctx.reqType = "json";
          return writeBody(JSON.stringify(ctx.request.body));
        }
      })
    )(ctx, next);
  };
};

// 代理配置
const proxyTable = getProxyConfig(ENV.SERVICE_ENV);

function createProxy(app) {
  Object.keys(proxyTable).map(context => {
    const options = proxyTable[context];
    // 使用代理
    app.use(proxy(context, options));
  });
}

module.exports = createProxy;
