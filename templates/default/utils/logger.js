const log4js = require('log4js')
const path = require('path')
const ENV = require('../constants/ENV')
const package = require('../package.json')

const logLevelMap = {
  dev: 'debug',
  test: 'debug',
  uat: 'error',
  production: 'error',
}

const getLogLevel = function() {
  const envType = ENV.SERVICE_ENV || 'dev'
  return logLevelMap[envType] || 'error'
}

const getLogFilePath = () => {
  const { name = 'unknown-project' } = package
  const logPath = `/data/logs/${name}`

  console.log('日志路径：', logPath)

  if (ENV.NODE_ENV === 'production') {
    return `${logPath}/app.log`
  }

  return path.join(process.cwd(), `/logs/app.log`)
}

log4js.addLayout('json', function(config) {
  return function(logEvent) {
    return JSON.stringify(logEvent)
  }
})

log4js.configure({
  appenders: {
    console: {
      type: 'console',
    },
    dateFile: {
      // 10 * 1024 * 1024, // = 10Mb
      maxLogSize: 1024 * 1024 * 1024,
      flags: 'a',
      type: 'dateFile',
      filename: getLogFilePath(),
      pattern: '.yyyyMMdd',
      compress: true,
      daysToKeep: 14,
      keepFileExt: true,
      layout: { type: 'json', separator: ',' },
    },
  },
  categories: {
    default: { appenders: ['dateFile', 'console'], level: getLogLevel() },
  },
})

const logger = log4js.getLogger()

module.exports = logger
