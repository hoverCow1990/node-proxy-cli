const ENV = {
  SERVICE_ENV: process.env.SERVICE_ENV,
  NODE_ENV: process.env.NODE_ENV,
}

console.log('ENV', ENV)

module.exports = ENV
