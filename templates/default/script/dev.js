const chalk = require('chalk')
const path = require('path')
const fs = require('fs')
const shell = require('shelljs')

const ENV = process.env.ENV

if (!['test', 'dev'].includes(ENV)) {
  console.log('-----------------------------------------')
  console.log(chalk.red('请传有效环境参数test或者dev'))
  console.log('-----------------------------------------')
  process.exit()
}

const ENV_CH = ENV === 'test' ? '测试' : '开发'

console.log('-----------------------------------------')
console.log(chalk.yellow(`当前运行的为${ENV_CH}环境`))
console.log('-----------------------------------------')

// node服务
shell.exec(`export NODE_ENV='development' ENV='${ENV}' && node index.js`)
