//评论星数
function selHeart(obj) {
    var _select = $(obj);
    _select.siblings("span").removeClass("on");
    _select.addClass("on");
    _select.prevAll("span").addClass("on");
}
//评论框
function toggleComment(obj) {
    var _select = $(obj);
    var a = _select.parents(".member_comment_set_con");
    var b = a.next();
    if (b.hasClass('active')) {
        $(".member_comment_box").removeClass("active");
    } else {
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
            {'orderStatus ': orderStatus},
            function (result) {
                $('.member_orders_main').html(result.xxx);
            }, 'json'
        );
    }
}
//登录focus
$(".login_item_input , .login_item_input_half").focus(function () {
    $(this).parents(".login_item , .login_item_half").addClass("focus");
});
$(".login_item_input , .login_item_input_half").blur(function () {
    $(".login_item , .login_item_half").removeClass("focus");
});
//
function verifySettime(val) {
    if ($("#user").val()) {
        if (!$("#user").hasClass("error")) {
            settime(val)
        }
        ;
    } else {
        $(val).closest("form")
            .find("div[for=user]")
            .append('<label for="user" class="error" id="user-error">请先输入手机号</label>');
    }
}
//60s倒计时
var countdown = 60;
function settime(val) {
    if (countdown == 0) {
        val.removeAttribute("disabled");
        val.className = val.className.replace('disabled', '');
        val.value = "发送验证码";
        countdown = 60;
        return;
    } else {
        val.setAttribute("disabled", true);
        val.className = 'bt_login_40_grey disabled';
        val.value = "重新发送(" + countdown + ")";
        countdown--;
    }
    setTimeout(function () {
        settime(val)
    }, 1000)
}
//下拉切换
function dropDownChange(obj) {
    var statusName = $(obj).attr("statusName");
    $(".coupon_status_name").html(statusName);
    $(".coupon_staus_label").toggleClass('act');
}
//消息删除
function deleteMessage(id) {
    $.ajax({
        url: url + "",
        data: {
            ids: id
        },
        type: 'post',
        timeout: 30000,
        success: function () {
            $("#myInfo-" + id).hide();
        },
        error: function () {
            //错误弹框
        }
    });
}
//会员中心地址栏
$("#addNewAddress").click(function () {
    $("#addressEdit").show()
});
$("#cancelAddEdit").click(function () {
    $("#addressEdit").hide();
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
        success: function (d) {
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
        success: function (d) {
            if (d.code == 0) {
                //地址id
                $("#myAddressList div#address_" + c).fadeOut("1500",
                    function () {
                        $(this).remove();
                    })
            }
        }
    })
}


/*******************************收货地址******************************/

var addressData = {
    consignee: '',
    province: '',
    city: '',
    county: '',
    address: '',
    mobile: '',
    phone: '',
    zipCode: ''
}
require(['open', 'layer'], function (open, layer) {
    var myAddressList = $("#myAddressList");
    //新增收货地址
    $('#addNewAddress').on('click', function () {
        open.open({
            title: '添加收货地址',
            tpl: 'address.html',
            datas: addressData,
            fn: function (index, element) {
                layer.close(index);
                return false;
            }
        })
    });
    //删除收货地址
    myAddressList.on('click', '.bt_edit_del', function () {
        var that = this;
        layer.confirm('确认删除收货地址？', {icon: 3}, function () {
            // 删除地址代码 。。。。。。
            $(that).parents("table").remove();
            layer.msg('删除地址成功', {icon: 1});
            //layer.msg('删除地址失败', {icon: 2});
        })
    })
    //设为默认
    myAddressList.on('click','.set_address_default', function () {
        $(this).parents('.member_address_box').addClass('act').siblings('.act').removeClass('act');
        return false;
    })
    //编辑地址
    myAddressList.on('click','.bt_edit_address',function(){
        open.open({
            title: '编辑收货地址',
            tpl: 'address.html',
            datas: addressData,
            fn: function (index, element) {
                layer.close(index);
                return false;
            }
        })
    })
})

