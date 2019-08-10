const routes = require('../../web/config/router.config')

const ssrRouters = []

function extractRouter(data, store) {
  if (Array.isArray(data)) {
    const nextLayer = []

    data.forEach(({ path, component, routes }) => {
      component && !store.includes(path) && store.push(path)

      Array.isArray(routes) && nextLayer.push(...routes)
    })

    nextLayer.length && extractRouter(nextLayer, store)
  }
}

extractRouter(routes, ssrRouters)

module.exports = ssrRouters
