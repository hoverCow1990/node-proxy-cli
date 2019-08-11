const getHosts = require("./Hosts");

/**
 *
 * @param {*} SERVICE_ENV String 环境变量 'dev' 'test' 'uat' 'prod'
 * 该函数可以在客户端中的 webpack.conf.js中proxy配置中使用
 * eg: proxy: getProxyConfig('dev')
 */
const getProxyConfig = function(SERVICE_ENV) {
  const ProxyConfig = {};
  const Hosts = getHosts(SERVICE_ENV);

  Object.entries(Hosts).map(([key, value]) => {
    ProxyConfig[key] = {
      target: value,
      changeOrigin: true,
      pathRewrite: {
        [`^${key}`]: ""
      }
    };
  });

  return ProxyConfig;
};

module.exports = getProxyConfig;
