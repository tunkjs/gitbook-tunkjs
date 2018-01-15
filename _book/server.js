const serve = require('koa-static-cache');
const Koa = require('koa');
const app = new Koa();
var path = require('path');

app.use(serve(path.join(__dirname + '/_book'), {
    maxAge: 60 * 60
}));

app.listen(3000);

