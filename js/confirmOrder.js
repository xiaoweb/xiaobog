/** * Created with WebStorm. * User: RD-小小WEB * Date: 2015/12/11 * Time: 15:16 */
define(['open'],function(open){
    //打开新窗口
    var addressDate = new initData({
        consignee : '',
        province : '',
        city : '',
        county:'',
        address:'',
        mobile : '',
        phone : '',
        zipCode :''
    })
    open.open({
        element : "#test2",
        tpl: 'address.html',
        datas : addressDate.change({
            consignee : 123
        }),
        fn : function(th){
            alert(th);
        }
    })
    //编辑窗口
    open.open({
        element : "#test",
        tpl:'address.html',
        datas : addressDate.data,
        fn : function(){
            alert(2)
        }
    })
})

