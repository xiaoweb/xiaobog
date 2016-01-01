/** * Created with WebStorm. * User: RD-小小WEB * Date: 2015/12/26 * Time: 0:30 */
var index = require('./routes/index'),
    user = require('./routes/user'),
    login = require('./routes/login'),
    fs = require('fs'),
    path = require('path'),
    mime = require('./MimeTypes')
    zlib = require('zlib');

function routes(router) {
    //首页
    router.get("/", index);

    //用户
    router.get("/user", user);

    //登录页
    router.get('/login', login);

    //静态资源列表
    router.get('/public/:file*', function*() {
        var th = this;
        var file = yield new Promise(function (res, rej) {
            fs.readFile('./public/' + th.params.file, function (err, data) {
                if (err) {
                    res(false)
                } else {
                    if (mime[path.extname(th.params.file).substr(1)]) {
                        zlib.inflate(data,function (err, buffer) {
                            if(err){
                                console.error(err)
                                res(0)
                            }else{
                                res({
                                    file: buffer,
                                    type: mime[path.extname(th.params.file).substr(1)]
                                })
                            }
                        })

                    } else {
                        res(false)
                    }
                }
            })
        });
        if (file) {
            this.type = file.type;
            this.body = file.file;
        } else {
            this.status = 404;
        }
    })
}

module.exports = routes;

