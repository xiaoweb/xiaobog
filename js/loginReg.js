$("#loginSubmit").click(function() {
        $("#loginForm").submit();
        });
$().ready(function() {
    var validator = $("#loginForm").bind("invalid-form.validate").validate({
        debug: true,
        errorPlacement: function(error, element) {
            $( element )
            .closest( "form" )
                .find( "div[for='" + element.attr( "id" ) + "']" )
                    .append( error );
            $( element )
            .closest( "form" )
                .find( "div[for='" + element.attr( "id" ) + "']" )
                    .addClass('error');
        },
        success: function(label) {
            label.text("").addClass("success");
            label.parents(".login_item , .login_item_half , .login_other_item").removeClass('error');
        },
        submitHandler: function() {
            alert("submitted!");
            //加载异步代码
        },
        rules: {

            user: {
                required: true,
                user: true,//调用扩展方法
            },
            authCode: {
                required: true,
            },
            passWord: {
                required: true,
                minlength: 5,
            },
            cPassWord: {
                required: true,
                equalTo: "#passWord",
            },
            forRemember: {
                required: false,
            },
            isAgree: {
                required: true,
            },
            forAutoSignin: {
                required: false,
            },
            verificationM:{
                required: false,
            },
            verificationC:{
                required: false,
            }
        },
        messages: {
            user: {
                required: "请输入用户名"
            },
            passWord: {
                required: "请输入密码",
                minlength: "密码至少5个字符"
            },
            authCode:{
                required: "请输入手机验证码"
            },
            cPassWord: {
                required: "请确认密码",
                equalTo: "请输入相同密码"
            },
            isAgree: {
                required: "请同意十月服务条款",
            },
        }


    });

});