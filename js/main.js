define.amd.jQuery = true;
require.config({
    baseUrl: 'js/',
    paths: {
        //短路径
        //插件列表
        jquery: 'plugin/jquery-1.8.3.min',
        avalon : 'plugin/avalon',
        easyzoom : 'plugin/easyzoom',
        validate : 'plugin/jquery.validate',
        layer : 'plugin/layer',
        laytpl : 'plugin/laytpl',
        lazyload : 'plugin/lazyload',
        listslide : 'plugin/list-slide-min',
        numbertext : 'plugin/numbertext',
        unslider : 'plugin/unslider',
        areaData:'plugin/areaData', //城市联动data
        area:'plugin/area', //城市联动js
        open: 'plugin/open', //弹窗
        //页面统一JS文件名
        help : 'helpC' //帮助页面用
    },
    shim: {
        //非模块与依赖
        unslider :  ["jquery"],//轮播插件
        listslide :  ["jquery"],//首页推荐插件
        layer: ["jquery"], //弹出层插件
        easyzoom: ["jquery"],//商品图片放大插件
        laytpl: ["jquery"], //模板引擎插件
        numbertext: ["jquery"], //加减数字插件
        lazyload: ['jquery'], //图片懒加载插件
        //页面js文件
        total : ['jquery'], //所有页面共用js文件
        index:['jquery','unslider','listslide'], //首页
        cart: ['layer'] //购物车JS
    },
    waitSeconds: 30//加载超时时间
});
