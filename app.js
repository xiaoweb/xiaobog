/**
 * Created by zhou on 2015/11/27.
 */
var koa = require('koa'),
    app = koa();

app.use(function*(next){
    this.body = "hello world";
    console.log(this.originalUrl );
});
app.listen(80);
app.listen(443)
