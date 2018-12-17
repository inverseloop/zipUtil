//index.js
//

'use strict';

const koa = require('koa');
const cors = require('@koa/cors');
const app = new koa();
const PORT = process.env.PORT || 1337;
//routes
const zipRoutes = require('./routes/zip');

//cors
app.use(
  cors({
    origin: function(ctx) {
      return 'http://10.0.0.220:8080'
    },
  }),
);

// logger
app.use(async (ctx, next) => {
  await next();
  const rt = ctx.response.get('X-Response-Time');
  console.log(`${ctx.method} ${ctx.url} - ${rt}`);
});

// x-response-time
app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.set('X-Response-Time', `${ms}ms`);
});

app.use(zipRoutes.routes());

app.use(async ctx => {
  ctx.status = 418;
  ctx.body = "I'm a teapot";
});

const server = app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

module.exports = server;
