const axios = require("axios");
const Host = require("../constants/Hosts");
const logger = require("./logger");

/**
 * 该文件暂时未用到～～～
 */

const instance = axios.create({
  timeout: 5000
});

instance.interceptors.response.use(
  function(response) {
    return response;
  },
  function(error) {
    console.log("error", error);
    // 记录错误日志
    logger.error(error);
    // Do something with response error
    return Promise.reject(error);
  }
);

// 获取头部
function getHeaders(ctx, op) {
  let {
    client_id,
    client_type,
    redirect_uri,
    referer,
    ticket,
    isserver,
    host
  } = ctx.req.headers;

  const headers = {
    client_id: client_id,
    client_type: client_type
  };

  if (isserver === "true") {
    console.log("服务端请求");
    const nodeTicket = ctx.cookies.get("nodeTicket");
    console.log("nodeTicket", nodeTicket);
    headers.ticket = nodeTicket || "";
    headers.cookie = ticket ? `ticket=${nodeTicket}` : "";
    headers.redirect_uri = host;
  } else {
    console.log("客户端请求");

    headers.ticket = ticket || "";
    headers.cookie = ticket ? `ticket=${ticket}` : "";
    headers.redirect_uri = redirect_uri;
  }

  return headers;
}

async function request({ type, url, map, ctx }) {}

async function transAuthGet({ type, url, map, ctx }) {
  url = `${Host[type]}${url}`;

  return await instance({
    headers: getHeaders(ctx),
    url,
    method: "GET",
    params: map
  });
}

async function transAuthPost({ type, url, map, ctx }) {
  url = `${Host[type]}${url}`;

  return await instance({
    headers: getHeaders(ctx),
    url,
    method: "POST",
    data: map
  });
}

module.exports = {
  request,
  transAuthGet,
  transAuthPost
};
