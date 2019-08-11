/**
 *
 * @param {*} SERVICE_ENV String 环境变量 'dev' 'test' 'uat' 'prod'
 * 所有代理配置将在./ProxyConfig.js 中进行处理
 * 由于我在ProxyConfig中会无差别使用pathRewrite: {[key]: ''}
 * 所以如果项目host地址需要, 请如下在host后补上
 * eg: /api/crs:  "https://xxxx.xx/api/crs"
 */

function getHost(SERVICE_ENV) {
  const DEV_HOST = {
    "/api/crs": "https://xxxx.cn/api/crs" // crs-biz
  };

  const TEST_HOST = {
    "/api/crs": "https://xxxx.cn/api/crs" // crs-biz
  };

  const UAT_HOST = {
    "/api/crs": "https://xxxx.cn/api/crs" // crs-biz
  };

  const PROD_HOST = {
    "/api/crs": "https://xxxx.cn/api/crs" // crs-biz
  };

  if (/https:\/\/xxxx\.cn/.test(DEV_HOST["/api/crs"])) {
    console.error(`请修改${__dirname}/Hosts.js下代理地址`);
  }

  if (typeof SERVICE_ENV !== "string") {
    // 准备报错机制
    return {};
  }

  const env = SERVICE_ENV.toUpperCase();

  switch (env) {
    case "DEV":
      return DEV_HOST;
    case "TEST":
      return TEST_HOST;
    case "UAT":
      return UAT_HOST;
    case "PROD":
      return PROD_HOST;
    default:
      return {};
  }
}

module.exports = getHost;
