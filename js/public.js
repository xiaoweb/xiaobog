//默认加载模块
var require = {
    deps: ['lazyload','total']
}
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
}
