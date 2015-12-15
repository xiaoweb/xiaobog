/** * Created with WebStorm. * User: RD-小小WEB * Date: 2015/12/11 * Time: 15:10 */
define(['jquery','layer','laytpl'],function($,layer,laytpl){
    var addressHtml = [];
    var index = 1;
    var domId = {
        index : 0
    };
    layer.config({
        path: './js/plugin/' //layer.js所在的目录，可以是绝对目录，也可以是相对目录
    });
    //打开窗口
    function openWindow(element,op){
        layer.close(op.loadIndex);
        layer.open({
            type: 1,
            area: '760px',
            title: op.title || '',
            closeBtn: 1,
            shadeClose: true,
            shade:0.2,
            skin: 'custom-layer-style',
            content: laytpl((function(a){
                if(typeof a == "object"){
                    return a.outerHTML;
                }else{
                    return a;
                }
            })(addressHtml[domId.index].dom)).render(op.datas),
            success: function(layero, index){
                layero.find(".custom-layer-btn").on('click',function(e){
                    var obDate = {
                        element:{},
                        data:{}
                    };
                    layero.find('[oct-ob]').each(function(i,t){
                        var octOb = $(t).attr("oct-ob");
                        obDate.element[octOb] = t;
                        obDate.data[octOb] = (function(element){
                            switch (element.tagName){
                                case 'INPUT':
                                    return element.value;
                                case 'SELECT':
                                    return  $(element).find('option:selected').val();
                                default :
                                    return element.innerHTML;
                            }
                        })(t)
                    });
                    var t = op.fn.call(obDate,index,layero);
                    if( typeof t != 'undefined' && t == false){
                        return false;
                    }
                });
                if(layero.find('.province').length){
                    require(['area'],function(area){
                        $(".address_box").area({
                            province :op.datas.province,
                            city :op.datas.city,
                            county :op.datas.county
                        });
                    });
                }
            }
        });
        element.disabled = false;
    }
    //触发事件
    function openAddress(op){
        op.datas = op.datas || {};
        op.fn = op.fn || new Function;
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
            if(domId.stu){
                openWindow(th,op);
            }else{
                if(typeof op.tpl == "string"){
                    op.loadIndex = layer.load(0,{
                        shade:0.2
                    });
                    $.get(op.tpl,function(data){
                        if(addressHtml.length){
                            domId.index++;
                        }
                        addressHtml.push({
                            title :  op.tpl,
                            dom : data
                        });
                        openWindow(th,op);
                    },'html')
                }else if(typeof op.tpl == "object"){
                    $(op.tpl).attr('dom-id',"dom"+ index++);
                    if(addressHtml.length){
                        domId.index++;
                    }
                    addressHtml.push({
                        dom : op.tpl,
                        title : $(op.tpl).attr('dom-id')
                    });
                    openWindow(th,op);
                }
            }
        })
    }
    return {
        open : openAddress
    }
})
