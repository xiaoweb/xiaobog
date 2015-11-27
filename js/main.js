define.amd.jQuery = true;
require.config({
    baseUrl: 'js/',
    shim: {
        layer: ["jquery"], //弹出层插件
        easyzoom: ["jquery"],//商品图片放大插件
        laytpl: ["jquery"], //模板引擎插件
        sort: ["easyzoom"], //商品用js
        numbertext: ["jquery"] //加减数字插件
    }
});



