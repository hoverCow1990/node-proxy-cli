const getHosts = require('./Hosts')

const getProxyConfig = function(SERVICE_ENV) {
  const ProxyConfig = {}
  const Hosts = getHosts(SERVICE_ENV)

  Object.entries(Hosts).map(([key, value]) => {
    ProxyConfig[key] = {
      target: value,
      changeOrigin: true,
      pathRewrite: {
        [`^${key}`]: '',
      },
    }
  })

  return ProxyConfig
}

module.exports = getProxyConfig
