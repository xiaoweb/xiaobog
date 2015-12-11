define(["jquery","easyzoom","lazyload"],function($){   //首个参数为一个数组，是这个模块的依赖，引入时会提前加载依赖
    //高级选项弹出效果
    var isContent = false;
    var setTime ;
    //标签事件
    $("#ad_nav a").hover(function(){
        clearTimeout(setTime);
        $(this).addClass("act").siblings("a").removeClass("act");
        $("#ad_content ul.ad_op_content_list").eq($(this).index()-1).addClass("act").siblings("ul").removeClass("act");
    },function(){
        setTime = setTimeout(function(){
            if(!isContent){
                $("#ad_nav a,#ad_content ul").removeClass("act");
            }
        },300);
    });
    //鼠标离开
    $("#ad_content").mouseleave(function(){
        $("#ad_nav a,#ad_content ul").removeClass("act");
    });
    //鼠标位置
    $("html").mousemove(function(e){
        ($(e.target).hasClass("ad_op_content_list,act") ||$(e.target).parents(".ad_op_content_list").hasClass("act"))? isContent = true : isContent = false;
    });

//左右箭头事件
    var api = $('.easyzoom').easyZoom().data('easyZoom');
    //小图事件
    $(".picture_pic_small ul li a").hover(function(){
        $(this).addClass("act").parent("li").siblings("li").find("a").removeClass("act");
        $(".easyzoom a").attr({"href":$(this).attr("data-zoom")}).find("img").attr("src",$(this).attr("href"));
        api.load();
    });
    var small = $(".picture_pic_small"),
        ul = small.find("ul"),
        liLength = ul.find("li").length,
        listWidth = ul.parent().width(),
        width = ul.find("li").outerWidth(true),
        btnLeft = ul.parent().prev(".small_arrow"),
        btnRight = ul.parent().next(".small_arrow");
    if(liLength < 5){
        return;
    }
    small.find(".small_arrow").show();
    ul.width(width * liLength);
    ul.data("left", 0);
    var ulWidth = ul.width();
    if(!(ul.data("left", 0) + width < 0)){
        $(".small_left_ico").parent().addClass("dis");
    }
    btnLeft.click(function () {
        var left = ul.data("left");
        if (left < 0) {
            small.find(".small_arrow").removeClass("dis");
            ul.data("left", left + width);
            ul.animate({
                left: "+=" + width
            }, 200);
            if(!(left + width < 0)){
                $(this).addClass("dis");
            }
        }
    });
    btnRight.click(function () {
        var left = ul.data("left");
        if (ulWidth + left > listWidth) {
            small.find(".small_arrow").removeClass("dis");
            ul.data("left", left - width);
            ul.animate({
                left: "-=" + width
            }, 200);
            if(!(ulWidth + left - width > listWidth)){
                $(this).addClass("dis");
            }
        }
    });

    //评论图片放大
    $(".pro_com_pic").on("click","img",function(){
        var zoomIn = $(this).attr("data-zoom-in");
        var zoomOut = $(this).attr("data-zoom-out");
        $(this).siblings(".act").removeClass("act").attr("src",zoomOut);
        if(this.className){
            this.className = "";
            this.src = zoomOut;
        }else{
            this.src = "";
            this.className = "act";
            this.src = zoomIn;
        }
    });
})


