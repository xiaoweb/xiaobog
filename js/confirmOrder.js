/** * Created with WebStorm. * User: RD-小小WEB * Date: 2015/12/11 * Time: 15:16 */
define(['open'],function(open){
    //单选按钮样式切换
    $(".confirm_ord_se_btn").on('click',function(){
        if(!$(this).hasClass('act')){
            $(this).addClass('act').siblings(".act").removeClass('act');
        }
        if($(this).hasClass('oct_invoice')){
            $(this).siblings(".confirm_ord_invoice_cont").addClass("act");
        }else{
            $(this).siblings(".confirm_ord_invoice_cont").removeClass("act");
        }
    });
    //优惠信息切换
    $('.confirm_ord_preferential li h5').on('click',function(){
        $(this).parents("li").toggleClass('act');
    })
    //默认地址
    $(".confirm_ord_receiver li").on('click',function(){
        if(!$(this).hasClass('act')){
            $(this).addClass('act').siblings('li.act').removeClass('act');
        }
    })



    /**************************弹窗的例子**************************/
    //initData 只个数据储存对象构造器
    var addressData = new initData({
        consignee : '',
        province : '',
        city : '',
        county:'',
        address:'',
        mobile : '',
        phone : '',
        zipCode :''
    })
    //添加收货人
    open.open({
        element : "#add_address",  //触发元素
        title:'添加收货人',        //弹窗title
        tpl: 'address.html',       //模板
        datas : addressData.data,  //填入的数据
        //模板中含有class为custom-layer-btn按钮的事件,将弹窗检视的数据与dom绑定在了这个方法的this上
        fn : function(index,element /*this:监视的数据与DOM；index：弹层的索引；element:这个弹层的DOM*/){
            console.log(this,this.data,this.element,index,element);
            //layer.close(index);  //关闭当前弹层
            return false;      //返回false 不执行元素默认事件
        }
    })
    //编辑窗口
    $(".confirm_ord_receiver li .confirm_ord_btn").each(function(i,t){
        open.open({
            element : t,
            title:'添加收货人',
            tpl: 'address.html',
            datas : addressData.change({
                consignee: t.innerHTML
            }),
            fn : function(index){
                layer.close(index);
                return false;
            }
        })
    })
})

