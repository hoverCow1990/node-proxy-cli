const formidable = require('formidable')

// jsonTypes
const jsonTypes = [
  'application/json',
  'application/json-patch+json',
  'application/vnd.api+json',
  'application/csp-report',
]

// formTypes
const formTypes = ['application/x-www-form-urlencoded', 'multipart/form-data']

// textTypes
const textTypes = ['text/plain']

function handlerJosn(ctx) {
  return new Promise((resolve, reject) => {
    try {
      let dataStr = ''

      ctx.req.on('data', data => {
        dataStr += data
      })

      ctx.req.addListener('end', () => {
        resolve({
          type: 'json',
          data: dataStr,
        })
      })
    } catch (err) {
      reject(err)
    }
  })
}

function handlerForm(ctx) {
  return new Promise((resolve, reject) => {
    try {
      const form = new formidable.IncomingForm()

      form.parse(ctx.req, function(err, fields, { files }) {
        if (files) {
          resolve({
            type: 'files',
            data: files,
          })
        } else {
          resolve({
            type: 'form',
            data: fields,
          })
        }
      })
    } catch (err) {
      reject(err)
    }
  })
}

// 处理data
function parseData(ctx) {
  // json数据
  if (ctx.request.is(jsonTypes)) {
    return handlerJosn(ctx)
  }

  // form数据
  if (ctx.request.is(formTypes)) {
    return handlerForm(ctx)
  }

  return handlerJosn(ctx)
}

module.exports = parseData
