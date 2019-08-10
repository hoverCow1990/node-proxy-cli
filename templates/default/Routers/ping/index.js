class Ping {
  constructor(router) {
    this.router = router
  }

  install() {
    this.ping()
  }

  // ping
  ping() {
    this.router.get('/ping', async function(ctx, next) {
      ctx.body = 'pong'
    })
  }
}

module.exports = Ping
