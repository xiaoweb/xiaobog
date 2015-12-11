define(['jquery'],function(jQuery){
    var $ = jQuery;
    //banner图居中
    jQuery(".flash_sale_banner img").each(function(){
        var $ = jQuery;
        if($(this).hasClass("d_layout")){
            $(this).css("margin-left","-"+$(this).width()/2+"px");
            $(this).parent().css("position","relative").height($(this).height());
        }else{
            $(this).css("margin-left","-"+$(this).width()/2+"px");
            $(this).parents(".flash_sale_banner").height($(this).height());
        }
    });
    //客服按钮弹出
    jQuery("#online_kefu").hover(function(){
        jQuery(this).find(".kefu_hover").toggle();
    });
    //安排客服
    jQuery.ajax({
        url : "http://128.128.10.74:3000/test",
        type : "post",
        dataType : "json",
        success : function(data){
            var a = jQuery('<a target="_blank"></a>');
            var Pre_lale =  '<img border="0" src="http://image.octmami.com/public/pic/web/pic_qqBt_beforeSale_01.jpg" alt="售前咨询" title="售前咨询">';
            var Aftermarket= '<img border="0" src="http://image.octmami.com/public/pic/web/pic_qqBt_afterSale_01.jpg" alt="售后服务" title="售后服务">';
            jQuery('.kefu_hover a').remove();
            jQuery(data.Pre_lale).each(function(i,t){
                jQuery('.kefu_hover').append(jQuery(a).clone().attr('href','http://wpa.qq.com/msgrd?v=3&uin='+data.Pre_lale[i]+'&site=qq&menu=yes').append(Pre_lale));
            });
            jQuery(data.Aftermarket).each(function(i,t){
                jQuery('.kefu_hover').append(jQuery(a).clone().attr('href','http://wpa.qq.com/msgrd?v=3&uin='+data.Aftermarket[i]+'&site=qq&menu=yes').append(Aftermarket));
            });
        }
    });
    //明天后天切换
    $(".flashsale_news_tab ul li").on("click",function(){
        if(!$(this).hasClass("act")){
            $(this).toggleClass("act").siblings("li").removeClass("act");
            $(".flashsale_news_content ul").removeClass("act").eq($(this).index()).addClass("act");
        }
    })
})
