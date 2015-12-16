/** * Created with WebStorm. * User: RD-小小WEB * Date: 2015/12/11 * Time: 15:16 */
define(['open'], function (open) {
    //单选按钮样式切换
    $(".confirm_ord_se_btn").on('click', function () {
        if (!$(this).hasClass('act')) {
            $(this).addClass('act').siblings(".act").removeClass('act');
        }
        if ($(this).hasClass('oct_invoice')) {
            $(this).siblings(".confirm_ord_invoice_cont").addClass("act");
        } else {
            $(this).siblings(".confirm_ord_invoice_cont").removeClass("act");
        }
    });
    //优惠信息切换
    $('.confirm_ord_preferential li h5').on('click', function () {
        $(this).parents("li").toggleClass('act');
    })


    /*默认地址*/
    //hover效果
    var addressLi = $(".confirm_ord_list ul");
    addressLi.on('mouseenter','li',function () {
        $(this).addClass('hover');
    });
    addressLi.on('mouseleave','li',function () {
        $(this).removeClass('hover');
    })

    //设为默认效果
    addressLi.on('click','.set_default', function () {
        $(this).parents("li").addClass("act").siblings("li.act").removeClass('act');
    })

    //删除地址事件
    addressLi.on('click','.delect_address', function () {
        var that = this;
        layer.confirm('确认删除收货地址？', {icon: 3}, function () {
            // 删除地址代码 。。。。。。
            $(that).parents("li").remove();
            layer.msg('删除地址成功', {icon: 1});
            //layer.msg('删除地址失败', {icon: 2});
        })
    })

    //优惠券显示切换
    $('.confirm_ord_coupon_tab div').on('click',function(){
        $(this).addClass('act').siblings("div.act").removeClass('act');
        $('.preferential_cont .confirm_ord_coupon_cont').eq($(this).index()).addClass("act").siblings(".act").removeClass("act")
    })
    //输入优惠券
    $('.toggle_enter').on('click',function(){
        $(this).next('.con_ord_cou_enter').toggleClass('act');
        return false;
    })



    /**************************弹窗的例子**************************/
    //initData 临时数据储存
    var addressData ={
        consignee: '',
        province: '',
        city: '',
        county: '',
        address: '',
        mobile: '',
        phone: '',
        zipCode: ''
    }
    //添加收货人
    $('#add_address').on('click',function(){
        open.open({
            title: '添加收货人',
            tpl: 'address.html',
            datas: addressData,
            fn: function (index,element) {
                layer.close(index);
                return false;
            }
        })
    })
    /**/
    //编辑窗口
    addressLi.on('click','.set_address', function () {
        open.open({
            title: '添加收货人',
            tpl: 'address.html',
            datas: addressData,
            fn: function (index) {
                console.log(this);
                layer.close(index);
                return false;
            }
        })
    })
})

