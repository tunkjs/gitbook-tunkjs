const serve = require('koa-static-cache');
const Koa = require('koa');
const app = new Koa();

app.use(serve(__dirname + '/_book', {
    maxAge: 60 * 60
}));

app.listen(3000);

