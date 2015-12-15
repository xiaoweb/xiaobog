$().ready(function() {
	resetDelete()
})
//评论星数
function selHeart(obj){
	var _select = $(obj);
	_select.siblings("span").removeClass("on");
	_select.addClass("on");
	_select.prevAll("span").addClass("on");
}
//评论框
function toggleComment(obj){
	var _select = $(obj);
	var a = _select.parents(".member_comment_set_con");
	var b= a.next();
	if (b.hasClass('active')){ 
		$(".member_comment_box").removeClass("active");
	}else{
		$(".member_comment_box").removeClass("active");
		b.addClass("active");
	}
}
//删除图片
function commentDelImg(obj) {
	var _select = $(obj);
	_select.closest('.comment_img_small').remove();
}
//订单页选项卡
function orderTabSelect(obj) {
      var orderStatus = $(obj).attr("orderStatus");
      if (!$(obj).hasClass("current")) {
        $(".orders_status_menu").removeClass("current");
        $(obj).addClass("current");
        $.post(
            '#',
            {'orderStatus ':orderStatus},
            function (result) {
                $('.member_orders_main').html(result.xxx);
            },'json'
        );
    }
}
//登录focus
$(".login_item_input , .login_item_input_half").focus(function(){
	$(this).parents(".login_item , .login_item_half").addClass("focus");
});
$(".login_item_input , .login_item_input_half").blur(function(){
	$(".login_item , .login_item_half").removeClass("focus");
});
//
function verifySettime(val){
	if ($("#user").val()) {
		if (!$("#user").hasClass("error")) {
			settime(val)
		};
	}else{
		$(val).closest( "form" )
                .find( "div[for=user]" )
                    .append('<label for="user" class="error" id="user-error">请先输入手机号</label>');
	}
}
//60s倒计时
var countdown=60; 
function settime(val) { 
	if (countdown == 0) { 
	val.removeAttribute("disabled");    
	val.className = val.className.replace('disabled', '');
	val.value="发送验证码";
	countdown = 60; 
	return;
	} else { 
	val.setAttribute("disabled", true); 
	val.className = 'bt_login_40_grey disabled';
	val.value="重新发送(" + countdown + ")"; 
	countdown--; 
	} 
	setTimeout(function() { 
	settime(val) 
	},1000) 
} 
//下拉切换
function dropDownChange(obj){
	var statusName = $(obj).attr("statusName");
	$(".coupon_status_name").html(statusName);
	$(".coupon_staus_label").toggleClass('act');
}
//消息删除
function deleteMessage(id) {
    $.ajax( {
        url : url + "",
        data : {
            ids : id
        },
        type : 'post',
        timeout : 30000,
        success : function() {
            $("#myInfo-" + id).hide();
        },
        error : function() {
            //错误弹框
        }
    });
}
//会员中心地址栏
$("#addNewAddress").click(function() {
    $("#addressEdit").show()
});
$("#cancelAddEdit").click(function() {
    $("#addressEdit").hide();
});
$("#myAddressList").delegate("a.bt_edit_address", "click",
function(a) {
    var b = $(this).prev("a").attr("id");
    $("#addressEdit").show();
    $("html,body").animate({
        scrollTop: $("#addressEdit").top - 20
    },
    100);
    modifyAddress(b, a)
});
function modifyAddress(c, b) {
    var a = {
        id: c
    };
    $.ajax({
        url: "#",
        type: "POST",
        dataType: "json",
        context: document.body,
        data: a,
        success: function(d) {
            if (d.code == 0) {
                $("#addressArea").html(d.data.area);
                $("#newAddressId").val(d.data.info.id);
                if (d.data.info.name != "") {
                    $("#receiverName").val(d.data.info.name)//收件人
                }
                if (d.data.info.address != "") {
                    $("#shipAddDetail").val(d.data.info.address)//收件地址
                }
                if (d.data.info.cell != "") {
                    $("#receiverMobile").val(d.data.info.cell)//手机
                }
                if (d.data.info.phone != "") {
                    $("#receiverPhone").val(d.data.info.phone)//固话
                }
            }
        }
    })
}
function clearForm() {
    $("#newAddressId").val("");
    $("#newAddressType").val("add");
    $("#receiverName").val("");
    $("#addressArea").find("option[value!='']").remove();
    $("#shipAddDetail").val("");
    $("#receiverMobile").val("");
    $("#receiverPhone").val("")
}
function resetDelete() {
    $("#myAddressList .bt_edit_del").confirm({
    	//调用弹出
        msg: "确定要删除此地址吗？",
        onOK: function(b) {
            var a = $(b.target);
            var c = a.attr("id");
            removeAddress(c, b)
        },
        onCancel: function() {}
    })
}
function removeAddress(c, b) {
    var a = {
        id: c
    };
    $.ajax({
        url: "#",
        type: "POST",
        dataType: "json",
        context: document.body,
        data: a,
        success: function(d) {
            if (d.code == 0) {
            	//地址id
                $("#myAddressList div#address_" + c).fadeOut("1500",
                function() {
                    $(this).remove();
                })
            }
        }
    })
}