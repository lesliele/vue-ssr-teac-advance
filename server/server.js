const Koa = require('koa');
const app = new Koa();
const send = require('koa-send');
const path = require('path');
let pageRouter;
const staticRouter = require('./router/static');
const isDev = process.env.NODE_ENV === 'development';

app.use(async (ctx, next) => {
  try {
    console.log(`path is ${ctx.path}`);
    await next();
  } catch (err) {
    console.log(err);
    ctx.response.status = 500;
    if (isDev) {
      ctx.response.body = err.message;
    } else {
      ctx.response.body = 'please try again';
    }
  }
})

app.use(async (ctx, next) => {
  if (ctx.path === '/favicon.ico') {
    await send(ctx, '/favicon.ico', { root: path.join(__dirname, '../') })
  } else {
    await next();
  }
})

if (isDev) {
  pageRouter = require('./router/dev-ssr');
} else {
  pageRouter = require('./router/ssr.js');
}
app.use(staticRouter.routes()).use(staticRouter.allowedMethods());
app.use(pageRouter.routes()).use(pageRouter.allowedMethods());

const HOST = process.env.HOST || '0.0.0.0';
const PORT = process.env.PORT || 3333;

app.listen(PORT, HOST, () => {
  console.log(`server is listening on ${HOST}:${PORT}`)
})
