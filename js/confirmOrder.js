/** * Created with WebStorm. * User: RD-小小WEB * Date: 2015/12/11 * Time: 15:16 */
define(['open'],function(open){
    var vm = avalon.define({
        $id : 'address',
        data : {

        }
    });

    //打开新窗口
    open.openAddress({
        vm : vm,
        element : "#test2",
        tpl: 'address.html',
        datas : {
            consignee : '12321',
            province : '上海市',
            city : '上海市',
            county:'普陀区',
            address:'123123',
            mobile : '123213',
            phone : '123123',
            zipCode :'123213'
        },
        fn : function(){
            alert(1);
        }
    })
    //编辑窗口
    open.openAddress({
        vm : vm,
        element : "#test",
        tpl:'address.html',
        fn : function(){
            alert(2)
        }
    })
})

