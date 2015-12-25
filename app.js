/**
 * Created by zhou on 2015/11/27.
 */
var koa = require('koa'),
    app = koa();

app.use(function*(next) {
    this.body = "hello world";
yield next;
console.log(this.url)
});

app.use(function*() {
    this.body = '123'
})

app.use(function*() {

})
app.listen(3000);
