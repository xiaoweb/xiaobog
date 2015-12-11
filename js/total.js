define(['jquery'],function($){
    //头部二维码弹出
    $('#attention').hover(function(){
        $(this).find(".qrcodeShow").stop().fadeToggle(200);
    });
//收藏商城
    function addToFavorite() {
        var a = "http://www.octmami.com/",
            b = "十月商城";document.all ? window.external.AddFavorite(a, b) : window.sidebar && window.sidebar.addPanel ? window.sidebar.addPanel(b, a, "") :
            alert("\u5bf9\u4e0d\u8d77\uff0c\u60a8\u7684\u6d4f\u89c8\u5668\u4e0d\u652f\u6301\u6b64\u64cd\u4f5c!\n\u8bf7\u60a8\u4f7f\u7528\u83dc\u5355\u680f\u6216Ctrl+D\u6536\u85cf\u672c\u7ad9\u3002") }
    $(".top_collect").click(function(){addToFavorite();return false;});
    //顶部导航下拉
    if($(".nav").length && !$(".nav_index").length){
        $(".all_categories").hover(function(){
            $(this).find(".categories_content").slideDown(200);
        },function(){
            $(this).find(".categories_content").stop().slideUp(200);
        });
    }
    //右侧悬浮按钮
    jQuery(window).scroll(function () {
        var y = jQuery(window).scrollTop();
        if (y < 290) {
            jQuery("#function").addClass("start");
        } else {
            jQuery("#function").removeClass("start");
        }
    });
    //客服按钮弹出
    jQuery("#function .f_kefu").hover(function () {
        jQuery(this).find(".kefu_hover").toggle();
    });
    //安排客服
    jQuery.ajax({
        url: "/page/call",
        type: "post",
        dataType: "json",
        success: function (data) {
            var a = jQuery('<a target="_blank"></a>');
            var Pre_lale = '<img border="0" class="d_default" src="http://image.octmami.com/public/pic/web/pic_qqBt_beforeSale_01.jpg" alt="售前咨询" title="售前咨询" style="position:relative;margin-left:0;top:0;left:0;">';
            var Aftermarket = '<img border="0" class="d_default" src="http://image.octmami.com/public/pic/web/pic_qqBt_afterSale_01.jpg" alt="售后服务" title="售后服务" style="position:relative;margin-left:0;top:0;left:0;">';
            jQuery('.kefu_hover a').remove();
            jQuery(data.Pre_lale).each(function (i, t) {
                jQuery('.kefu_hover').append(jQuery(a).clone().attr('href', 'http://wpa.qq.com/msgrd?v=3&uin=' + data.Pre_lale[i] + '&site=qq&menu=yes').append(Pre_lale));
            });
            jQuery(data.Aftermarket).each(function (i, t) {
                jQuery('.kefu_hover').append(jQuery(a).clone().attr('href', 'http://wpa.qq.com/msgrd?v=3&uin=' + data.Aftermarket[i] + '&site=qq&menu=yes').append(Aftermarket));
            });
        }
    });
})
