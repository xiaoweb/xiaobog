/** * Created with WebStorm. * User: RD-小小WEB * Date: 2015/12/26 * Time: ‏‎22:19 */
var koa = require('koa'),
    router = require('koa-router')(),
    app = koa(),
    jade = require('jade'),
    routes = require('./routes'),
    fs = require('fs'),
    mongoose = require('mongoose');

//环境 NODE_ENV || development || production
app.env = 'NODE_ENV';

//日志
app.use(function *(next) {
    var time = new Date();
    yield next;
    var log = time.toLocaleString() + " " + this.ip + " " + this.method + " " + this.host + this.url + " " + this.status + " " + (new Date().getTime() - time.getTime()).toString() + 'ms';
    fs.appendFile(__dirname + '/log/log.log', log + '\n', function (err) {
        err ? console.error(err) : app.env == "development" && console.info(log);
    })
});

//模板引擎
app.use(function*(next) {
    !this.res.render && (this.res.render = function (template, data) {
        return jade.compileFile(__dirname + '/views/' + template + '.jade', {pretty: false})(data)
    })
    yield next;
})

//路由
routes(router);
app.use(router.routes())

mongoose.connect('mongodb://xiaowebblog:123456@128.128.9.27:27017/xiaoweb',function(err){
    if(err){
        console.log(err);
    } else{
        console.log("连接成功")
    }
});

//端口
app.listen(80);





