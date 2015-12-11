define(function () {
    //banner slide
    var slide = $('.banner')
        .hover(function () {
            if ($('.banner li').length > 1) {
                $('.arrow').stop().fadeIn(200);
            }
        }, function () {
            $('.arrow').stop().fadeOut(200);
        }).unslider({
            fluid: true,
            delay: 10000
        });
    $('.arrow').click(function () {
        var data = slide.data('unslider');
        if ($(this).hasClass("left")) {
            data.prev();
        } else if ($(this).hasClass("right")) {
            data.next();
        }
    });
    //推荐商品轮播
    $("#list").hover(function () {
        $(this).find(".index").fadeToggle(200);
    });
    $("#list_slide").parallelRoll({});
    //新闻下方广告位出现后新闻高度固定
    if ($("#hot").is(':visible')) {
        $(".product .booth .right .news_content ul").height(130);
    }
    //分段推荐tab切换
    var tabContent = $(".slide_tab_content ul");
    $(".slide_tab_nav li").on("click", function () {
        if (!$(this).attr("isc")) {
            var th = $(this);
            th.attr("isc", "1");
            var indess = $(this).index();
            var position = $(this).attr('val');
            if (!$(".slide_tab_content ul").eq(indess).find("li").length) {
                $.ajax({
                    url: "/default/recommend",
                    type: "post",
                    data: "position=" + position,
                    success: function (data) {
                        // console.log(data)
                        $('.slide_tab_content ul').eq(indess).append(data);
                        th.removeAttr("isc");
                        $(".slide_tab_content ul").hide().eq(indess).stop().fadeIn(200);
                    }
                });
            }
        }
        if (!$(this).hasClass("act")) {
            $(this).addClass("act").siblings("li").removeClass("act");
            $(".slide_tab_content ul").hide().eq($(this).index()).stop().fadeIn(200);
        }
    });
    /*评论切换*/
    var comTabContent = $(".hot_com_tab_content ul");
    $(".hot_com_tab_nav li").on("click", function () {
        if (!$(this).attr("isc")) {
            var th = $(this);
            th.attr("isc", "1");
            var indess = $(this).index();
            var info_id = $(this).attr('val');
            var type = $(this).attr('type');
            if (!$(".hot_com_tab_content ul").eq(indess).find("li").length) {
                $.ajax({
                    url: "/default/review",
                    type: "post",
                    data: "type=" + type + "&info_id=" + info_id,
                    success: function (data) {
                        // console.log(data)
                        $('.hot_com_tab_content ul').eq(indess).append(data);
                        th.removeAttr("isc");
                        $(".hot_com_tab_content ul").hide().eq(indess).stop().fadeIn(200);
                    }
                });
            }
        }
        if (!$(this).hasClass("act")) {
            $(this).addClass("act").siblings("li").removeClass("act");
            comTabContent.hide().eq($(this).index()).stop().fadeIn(200);
        }
    });
    //楼层右侧品牌切换
    var div = jQuery('.brand_slide');
    div.each(function (i, t) {
        var slide = jQuery(this).unslider({
            speed: 600
        });
        var data = slide.data('unslider');
        jQuery(this).nextAll('.small_arrow').click(function () {
            if (jQuery(this).hasClass("prev")) {
                data.prev();
            } else if (jQuery(this).hasClass("next")) {
                data.next();
            }
        });
    });
})
