const Koa = require('koa');
const PORT = 3000;
const app = new Koa();

function handlePostParams (ctx, next) {
  return new Promise((resolve, reject) => {

    const arr = [];
    ctx.req.on('data', (chunk) => {
      arr.push(chunk);
    });
    ctx.req.on('end', () => {
      const body = Buffer.concat(arr).toString();
      resolve(body);
      ctx.request.body = body;
      next();
    });
  });
}

app.use(handlePostParams);
app.use(async (ctx) => {
  ctx.body = {
    query: ctx.query,
    body: ctx.request.body
  };
});

app.listen(PORT, () => {
  console.log(`server is listening on port ${PORT}`);
});
