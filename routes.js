/** * Created with WebStorm. * User: RD-小小WEB * Date: 2015/12/26 * Time: 0:30 */
var index = require('./routes/index'),
    user = require('./routes/user'),
    login = require('./routes/login');

function routes(router) {
    //首页
    router.get("/", index);

    //用户
    router.get("/user", user);

    //登录页
    router.get('/login', login);

}

module.exports = routes;

