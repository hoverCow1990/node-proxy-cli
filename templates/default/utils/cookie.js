const getUrlCookie = function(ctx) {
  const query = ctx.request.query

  return query.ticket
}

module.exports = {
  getUrlCookie,
}
