/** * Created with WebStorm. * User: RD-小小WEB * Date: 2015/12/9 * Time: 9:35 */
/*最近浏览JS*/
define(["avalon", "jquery"], function (avalon, $) {
    var refresh = avalon.define({
        $id: "recently",
        list: [] //最近浏览商品数据模型，改变他页面上内容会自动更新
    });
    //获得最近列表 & 换一批事件
    avalon.scan(); //手动扫描一次视图
    $("#refresh").on("click", (function recentlyList() {
        var setDisabled = new Function();
        if (this != window) {      //判断执行环境
            var th = this;
            if (this.disable) {    //判断上次请求是否完成，否则中断事件
                return
            }
            this.disable = true;   //防止重复提交
            setDisabled = function () {
                th.disable = false;    //重写方法，恢复按钮状态
            }
        }
        //异步请求数据
        $.post("./data_test/refreshList.json", function (data) {
            refresh.list = data;      //将返回的数据赋给数据模型
            setDisabled();
        }, "json").error(function (err) {
            console.log(err);
            setDisabled();
        });
        return recentlyList; //首次执行后返回函数自身给事件注册
    })());
})