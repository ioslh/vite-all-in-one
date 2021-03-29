import Koa from 'koa'

export function createServer() {
  const app: Koa = new Koa()
  app.use(async (ctx: Koa.Context, next: Koa.Next) => {
    if (/^\/api/.test(ctx.path)) {
      ctx.set('Content-Type', 'application/json')
      ctx.body = JSON.stringify({
        greeting: 'Hello world',
        now: new Date()
      })
    } else {
      await next()
    }
  })
  return app
}
