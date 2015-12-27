/** * Created with WebStorm. * User: RD-小小WEB * Date: 2015/12/26 * Time: 1:01 */
module.exports = function*(next){
    this.body = this.res.render('user',{val:"login"})
}
