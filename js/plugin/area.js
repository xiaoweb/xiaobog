/** * Created with WebStorm. * User: RD-小小WEB * Date: 2015/12/11 * Time: 10:15 */
define(['jquery','areaData'],function($,data){
    $.fn.area = function(option){
        var index;
        var province = this.find(".province");
        if(!province.length){return }
        var city = this.find(".city");
        var county = this.find(".county");
        function eachData(ele,data){
            ele.find('option').eq(0).nextAll().remove();
            $(data).each(function(i,t){
                ele.append('<option>'+ t.name+'</option>')
            });
            ele[0][0].selected = true;
        }
        eachData(province,data);
        province.on("change",function(){
            index = this.selectedIndex -1;
            county.find('option').eq(0).nextAll().remove();
           if(!data[index].children[(0)].children){
               eachData(city,[{name:data[index].name}]);
           }else{
               eachData(city,data[index].children);
           }
        });
        city.on("change",function(){
            if(!data[index].children[(0)].children){
                eachData(county,data[index].children);
            }else{
                eachData(county,data[index].children[(this.selectedIndex-1)].children);
            }
        });
        if(option.province){
            var indexArr = [];
            $(data).each(function(i,t){
                if(t.name == option.province){
                    indexArr.push(i);
                    if(option.province != option.city){
                        $(t.children).each(function(i,t){
                            if(t.name == option.city){
                                indexArr.push(i);
                                $(t.children).each(function(i,t){
                                    if(t.name == option.county){
                                        indexArr.push(i);
                                        return false;
                                    }
                                })
                                return false;
                            }
                        })
                    }else{
                        $(t.children).each(function(i,t){
                            if(t.name == option.county){
                                indexArr.push(i);
                                return false;
                            }
                        })
                    }
                    return false;
                }
            })
            province[0].options[indexArr[0]+1].selected = true;
            province.change();
            if(option.province == option.city){
                city[0].options[1].selected = true;
            }else{
                city[0].options[indexArr[1]+1].selected = true;
            }
            city.change();
            county[0].options[(indexArr[2] || indexArr[1]) +1].selected = true;
            county.change();
        }
        $([province,city,county]).each(function(i,t){
            t[0].disabled = false;
        })
    };
})
