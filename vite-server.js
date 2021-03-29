import fs from 'fs'
import path from 'path'
import vite from 'vite'
import koaConnect from 'koa-connect'

async function createServer() {
  const viteServer = await vite.createServer()
  const { createServer: createNodeServer } = await viteServer.ssrLoadModule('./src/backend/app.ts')
  const app = createNodeServer()

  /**
   * If you prefer expressjs, then just `app.use(viteServer.middlewares)`
   */
  app.use(koaConnect(viteServer.middlewares))

  app.use(async (ctx) => {
    const template = fs.readFileSync(path.resolve(viteServer.config.root, 'index.html'), 'utf-8')
    const html = await viteServer.transformIndexHtml(ctx.originalUrl, template) 
    ctx.type = 'html'
    ctx.body = html
  })
  return app
}

createServer().then(app => {
  app.listen(3000)
  /** optionally use https by following
   *
   * require('https').createServer({
   *   key: fs.readFileSync('PATH_TO_KEY_FILE', 'utf-8'),
   *   cert: fs.readFileSync('PATH_TO-CERT_FILE', 'utf-8'),
   * }, app.callback()).listen(443)
  */
})