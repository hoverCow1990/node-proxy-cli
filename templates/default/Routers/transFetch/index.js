const getParams = require('./getParams.js')
const { transAuthGet, transAuthPost } = require('../../utils/request.js')

class TransFetch {
  constructor(router) {
    this.router = router
  }

  install() {
    this.transferGet()
    this.transferPost()
  }

  // 透传get请求
  transferGet() {
    this.router.get('/node-biz/transfer/get', async function(ctx, next) {
      console.log('get请求', ctx.request.query)

      const { statue, data } = getParams(ctx.request.query)

      if (!statue) {
        ctx.body = data

        return
      }

      const { map, type, url } = data

      try {
        const res = await transAuthGet({
          type,
          url,
          map,
          ctx,
        })

        ctx.body = res.data
      } catch (e) {
        console.log('e.response', e.response)
        ctx.response.status = 500
        ctx.response.body = e.response.data
      }
    })
  }

  // 透传get请求
  transferPost() {
    this.router.post('/node-biz/transfer/post', async function(ctx, next) {
      console.log('post请求', ctx.request.body)

      const { statue, data } = getParams(ctx.request.body)

      if (!statue) {
        ctx.body = data

        return
      }

      const { map, type, url } = data

      try {
        const res = await transAuthPost({
          type,
          url,
          map,
          ctx,
        })

        ctx.body = res.data
      } catch (e) {
        // console.log(e)
        ctx.response.status = 500
        ctx.response.body = e.response.data
      }
    })
  }
}

module.exports = TransFetch
