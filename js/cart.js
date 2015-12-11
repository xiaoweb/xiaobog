define(function(){
    layer.config({
        path: './js/plugin/' //layer.js所在的目录，可以是绝对目录，也可以是相对目录
    });
    //删除购物车商品事件
    $(".cart_delete").on('click', function () {
        layer.confirm('确认删除商品？', {icon: 3}, function () {
            //layer.msg('删除商品成功', {icon: 1});
            layer.msg('删除商品失败', {icon: 2});
        })
    })
})
