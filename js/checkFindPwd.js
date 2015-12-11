$(function(){
    var a = 0;
    $(".status1 .findpwd_input").focusin(function(b) {
        $(".findpwd_notice").text("")
    });
    $("#findPwdPost").click(function(c) {
        c.preventDefault();
        var b = {
            mobile: $(".findpwd_input[name=mobile]").val()
        };
        if (a == 0) {
            a = 1;
            $.ajax({
                url: "#",
                type: "POST",
                dataType: "json",
                data: b,
                success: function(d) {
                    switch (d.code) {
                    case 1:
                        document.location.href = d.redirect_url;
                        break;
                    case 2:
                        $('.findpwd_notice[data-for="mobile"]').text(d.msg);
                        break;
                    default:  
                        $('.findpwd_notice[data-for="mobile"]').text(); 
                        break;
                    }
                    a = 0
                }
            })
        }
    });
    $("#findPwdPostMobile").click(function(c) {
        c.preventDefault();
        var b = {
            mobile_verified_code: $(".findpwd_input[name=mobile_verified_code]").val()
        };
        if (a == 0) {
            a = 1;
            $.ajax({
                url: "#",
                type: "POST",
                dataType: "json",
                data: b,
                success: function(d) {
                    switch (d.code) {
                    case 1:
                        document.location.href = d.redirect_url;
                        break;
                    case 2: $('.findpwd_notice[data-for="mobilecode"]').text(d.msg);
                        break;
                    }
                    a = 0
                }
            })
        }
    });
    $("#findPwdChangePwd").click(function(c) {
        var b = {
            passwd: $(".findpwd_input[name=newpwd]").val(),
            confirm_passwd: $(".findpwd_input[name=newpwd2]").val()
        };
        if (b.passwd == "") {
            $('.findpwd_notice[data-for="newpwd"]').text("密码不能为空")
        } else {
            if (b.confirm_passwd == "") {
                $('.findpwd_notice[data-for="newpwd2"]').text("密码不能为空")
            } else {
                if (b.passwd == b.confirm_passwd) {
                    $.ajax({
                        url: "#",
                        type: "POST",
                        dataType: "json",
                        data: b,
                        success: function(d) {
                            if (d.code == 1) {
                                document.location.href = d.redirect_url
                            } else {
                                $('.findpwd_notice[data-for="newpwd2"]').text(d.msg)
                            }
                        }
                    })
                } else {
                    $('.findpwd_notice[data-for="newpwd2"]').text("密码不一致, 请重新输入")
                }
            }
        }
    })
});