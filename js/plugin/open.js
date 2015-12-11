/** * Created with WebStorm. * User: RD-小小WEB * Date: 2015/12/11 * Time: 15:10 */
define(['jquery','avalon','layer'],function($,avalon,layer){
    var addressHtml = [];
    var index = 1;
    var domId = {
        index : 0
    };
    layer.config({
        path: './js/plugin/' //layer.js所在的目录，可以是绝对目录，也可以是相对目录
    });
    //打开窗口
    function openWindow(element,fn,vm){
        layer.closeAll();
        layer.open({
            type: 1,
            area: '760px',
            title: '添加收货地址',
            closeBtn: 1,
            shadeClose: true,
            shade:0.2,
            skin: 'address-layer-style',
            content: (function(a){
                if(typeof a == "object"){
                    return a.outerHTML;
                }else{
                    return a;
                }
            })(addressHtml[domId.index].dom)
        });
        $(".address-layer-style .save_btn").on('click',fn);
        avalon.scan();
        if($(".address-layer-style .province").length){
            require(['area'],function(area){
                $(".address_box").area({
                    province :vm.data.province,
                    city :vm.data.city,
                    county :vm.data.county
                });
            });
        }
        element.disabled = false;
    }
    //触发事件
    function openAddress(op){
        op.datas = op.datas || {};
        op.fn = op.fn || new Function;
        op.vm = op.vm || {};
        op.id = $(op.tpl).attr("dom-id") || op.tpl;
        $(op.element).on("click",function(){
            var th = this;
            var id  = $(op.tpl).attr("dom-id") || op.tpl;
            if(this.disabled){
                return
            }
            this.disabled = true;
            $(addressHtml).each(function(i,t){
                if(t.title == id){
                    domId.index  = i;
                    domId.stu = true;
                    return false;
                }else{
                    domId.stu = false;
                    domId.index = 0;
                }
            });
            if(!domId.stu){
                layer.load(0,{
                    shade:0.2
                });
                if(typeof op.tpl == "string"){
                    $.get(op.tpl,function(data){
                        op.vm.data = op.datas;
                        if(addressHtml.length){
                            domId.index++;
                        }
                        addressHtml.push({
                            title :  op.tpl,
                            dom : data
                        });
                        openWindow(th,op.fn,op.vm);
                    },'html')
                }else if(typeof op.tpl == "object"){
                    op.vm.data = op.datas;
                    $(op.tpl).attr('dom-id',"dom"+ index++);
                    if(addressHtml.length){
                        domId.index++;
                    }
                    addressHtml.push({
                        dom : op.tpl,
                        title : $(op.tpl).attr('dom-id')
                    });
                    openWindow(th,op.fn,op.vm);
                }
            }else{
                op.vm.data = op.datas;
                openWindow(th,op.fn,op.vm);
            }
        })
    }
    return {
        openAddress : openAddress
    }
})
