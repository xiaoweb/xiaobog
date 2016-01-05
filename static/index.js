/** * Created with WebStorm. * User: RD-小小WEB * Date: 2016/1/1 * Time: 11:29 */
var mineType = require('./MimeTypes'),
    fs = require('fs'),
    path = require('path'),
    zlib = require('zlib')

//静态资源列表
module.exports = function(){
    return function *(next){
        var th = this;
        var file = yield new Promise(function (res, rej) {
            fs.readFile('./public/' + th.params.file, function (err, data) {
                if (err) {
                    res(false)
                } else {
                    if (mineType[path.extname(th.params.file).substr(1)]) {
                        zlib.inflate(data,function (err, buffer) {
                            if(err){
                                console.error(err)
                                res(0)
                            }else{
                                res({
                                    file: buffer,
                                    type: mineType[path.extname(th.params.file).substr(1)]
                                })
                            }
                        })

                    } else {
                        res(false)
                    }
                }
            })
        });
        console.log(file)

        return;
        if (file) {
            this.type = file.type;
            this.body = file.file;
        } else {
            this.status = 404;
        }
    }
}
