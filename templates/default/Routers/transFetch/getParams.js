function transParams(map, type, url) {
  return {
    type: `${type}`,
    map: JSON.parse(map),
    url: url.startsWith('/') ? url : `/${url}`,
  }
}

function getParams(query) {
  let { map = '{}', type, url } = query

  if (typeof url !== 'string') {
    return {
      statue: false,
      data: {
        code: '20001',
        msg: 'params.url is required',
      },
    }
  }

  if (!Number.isInteger(type) && !/^\d+$/.test(type)) {
    return {
      statue: false,
      data: {
        code: '20001',
        msg: 'params.type is number',
      },
    }
  }

  return {
    statue: true,
    data: transParams(map, type, url),
  }
}

module.exports = getParams
