//加载layui下的内置模块
layui.use(['form','layer','jquery'],function(){
    var form = layui.form,
        layer = parent.layer === undefined ? layui.layer : top.layer
        $ = layui.jquery;

    //QQ图标等登录按钮
    $(".loginBody .seraph").click(function(){
        layer.msg("这只是做个样式，至于功能，你见过哪个后台能这样登录的？还是老老实实的找管理员去注册吧",{
            time:5000
        });
    })

    //登录按钮调用登录接口实现登录
    form.on("submit(login)",function(data){
        $(this).text("登录中...").attr("disabled","disabled").addClass("layui-disabled");

         $.post("../../../Admin/login",{
             username : $("#userName").val(),  //管理员
             password : $("#password").val(),  //密码

         },function(res){
             if(res.code==200){
                 window.sessionStorage.setItem('uName',$("#userName").val());
                 window.sessionStorage.setItem('pwd',$("#password").val());

                 layer.msg(res.msg,{time:1500});
                 setTimeout(function(){
                     window.location.href = "../../../public/index.html";
                 },1000);
                 return false;
             }else{
                 layer.msg(res.msg,{time:1500});
                 setTimeout(function(){
                     window.location.reload();
                 },1500);

             }
         })

    });

    //退出注销按钮
    $("#layout").click(function(){


        $.post('../../../Admin/layout',{},function(data){
            if(data.code==200){
                sessionStorage.removeItem("uName");
                layer.msg('注销中.....即将返回登录页面',{time:1500});
                setTimeout(function(){
                    window.location.href="./page/login/login.html";
                },1500);
            }else{
               layer.alert('注销失败');
            }
        });

    });



    //表单输入效果
    $(".loginBody .input-item").click(function(e){
        e.stopPropagation();
        $(this).addClass("layui-input-focus").find(".layui-input").focus();
    })
    $(".loginBody .layui-form-item .layui-input").focus(function(){
        $(this).parent().addClass("layui-input-focus");
    })
    $(".loginBody .layui-form-item .layui-input").blur(function(){
        $(this).parent().removeClass("layui-input-focus");
        if($(this).val() != ''){
            $(this).parent().addClass("layui-input-active");
        }else{
            $(this).parent().removeClass("layui-input-active");
        }
    })
})
