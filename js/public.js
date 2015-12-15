//默认加载模块
var require = {
    deps: ['lazyload','total']
}
/*数据储蓄对象构造函数*/
function initData(data){
    this.data = data;
    this.change = function(obj){
        var k = {};
        for(var i in data){
            k[i] = data[i]
        }
        for(var t in obj){
            k[t] = obj[t]
        }
        return k
    }
    this.save = function(obj){
        for(var i in obj){
            data[i] = obj[i]
        }
        return data
    }
}
