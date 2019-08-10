class StaticRender {
  constructor(router) {
    this.router = router;
  }

  install() {
    this.render();
  }

  // render
  render() {
    this.router.get("/", async function(ctx) {
      await ctx.render("index");
    });
  }
}

module.exports = StaticRender;
