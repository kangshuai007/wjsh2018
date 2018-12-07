/**
 * Created by kangshuai on 2018/10/2.
 */
layui.use(['form','layer','table','laytpl','jquery'],function(){
    var form = layui.form,
        layer = parent.layer === undefined ? layui.layer : top.layer,
        $ = layui.jquery,
        laytpl = layui.laytpl,
        table = layui.table;

    //用户列表
    var tableIns = table.render({
        elem: '#signUpList',
        url : '../../../Sting/showUser',

        response: {
            statusCode: 200 //规定成功的状态码，默认：0
        },
        cellMinWidth : 95,
        page : true,
        height : "full-125",
        limits : [10,20,30,40],
        limit : 10,
        loading:true,
        id : "signUpListTable",
        cols : [[
            {type: "checkbox", fixed:"left", width:50},
            {field: 'id', title: '用户ID', minWidth:50, align:"center"},
            {field: 'name', title: '用户名', minWidth:100, align:"center"},
            {field: 'tel', title: '联系方式', minWidth:100, align:"center"},
            {field: 'type', title: '类别', align:'center'},
            {field: 'style', title: '授课形式', align:'center'},
            {field: 'class', title: '课程', align:'center'},
            {field: 'ydate', title: '预定日期', align:'center',minWidth:150},
            {title: '操作', minWidth:175, templet:'#signUpListBar',fixed:"right",align:"center"}
        ]]
    });

    //搜索【此功能需要后台配合，所以暂时没有动态效果演示】
    //$(".search_btn").on("click",function(){
    //    if($(".searchVal").val() != ''){
    //        table.reload("newsListTable",{
    //            page: {
    //                curr: 1 //重新从第 1 页开始
    //            },
    //            where: {
    //                key: $(".searchVal").val()  //搜索的关键字
    //            }
    //        })
    //    }else{
    //        layer.msg("请输入搜索的内容");
    //    }
    //});
    //-----------------------------------------------------
    //搜索功能
    var $ = layui.$, active = {
        reload: function(){
            if($(".searchVal").val() != ''){
                table.reload('signUpListTable', {
                    where: {
                        keyword: $(".searchVal").val()
                    }
                });
            }else{
                layer.msg("请输入搜索的内容");
            }

        }
    };
    $('.search_btn').on('click', function(){
        var type = $(this).data('type');
        active[type] ? active[type].call(this) : '';
    });

    //添加用户
    function addUser(edit){
        var index = layui.layer.open({
            title : "添加用户",
            type : 2,
            content : "userAdd.html",
            success : function(layero, index){
                var body = layui.layer.getChildFrame('body', index);
                if(edit){
                    body.find(".userName").val(edit.username);  //登录名
                    body.find(".userEmail").val(edit.userEmail);  //邮箱
                    body.find(".userSex input[value="+edit.userSex+"]").prop("checked","checked");  //性别
                    body.find(".userGrade").val(edit.userGrade);  //会员等级
                    body.find(".userStatus").val(edit.userStatus);    //用户状态
                    body.find(".userDesc").text(edit.userDesc);    //用户简介
                    form.render();
                }
                setTimeout(function(){
                    layui.layer.tips('点击此处返回用户列表', '.layui-layer-setwin .layui-layer-close', {
                        tips: 3
                    });
                },500)
            }
        })
        layui.layer.full(index);
        window.sessionStorage.setItem("index",index);
        //改变窗口大小时，重置弹窗的宽高，防止超出可视区域（如F12调出debug的操作）
        $(window).on("resize",function(){
            layui.layer.full(window.sessionStorage.getItem("index"));
        })
    }
    $(".addNews_btn").click(function(){
        addUser();
    })

    //批量删除
    $(".delAll_btn").click(function(){
        var checkStatus = table.checkStatus('signUpListTable'),
           data = checkStatus.data,

              newsId = [];

             if(data.length > 0) {
                 for (var i in data) {
                     newsId.push(data[i].id);
                  }
             console.log(newsId);

            //数组json序列化
            var jsonIds = JSON.stringify(newsId);
            layer.confirm('确定删除选中的用户？', {icon: 3, title: '提示信息'}, function (index) {
                 $.post("../../../Sting/delAll",{
                     usersId : jsonIds  //将需要删除的newsId作为参数传入
                 },function(data){
                     if(data.code==200){
                         layer.msg('删除成功',{time:1000});
                         setTimeout(function(){
                             tableIns.reload();
                             layer.close(index);
                         },1000);

                     }else{
                         layer.msg('删除失败',{time:1000});
                         setTimeout(function(){
                             tableIns.reload();
                             layer.close(index);
                         },1000);
                     }

                 })
            })
        }else{
            layer.msg("请选择需要删除的用户");
        }
    })

    //列表操作
    table.on('tool(signUpList1)', function(obj){
        var layEvent = obj.event,
            data = obj.data;

        if(layEvent === 'edit'){ //编辑
            addUser(data);
        }else if(layEvent === 'usable'){ //启用禁用
            var _this = $(this),
                usableText = "是否确定禁用此用户？",
                btnText = "已禁用";
            if(_this.text()=="已禁用"){
                usableText = "是否确定启用此用户？",
                    btnText = "已启用";
            }
            layer.confirm(usableText,{
                icon: 3,
                title:'系统提示',
                cancel : function(index){
                    layer.close(index);
                }
            },function(index){
                _this.text(btnText);
                layer.close(index);
            },function(index){
                layer.close(index);
            });
        }else if(layEvent === 'del'){ //删除

            layer.confirm('确定删除此用户？',{icon:3, title:'提示信息'},function(index){

                 $.post("../../../Sting/delUser",{
                     ids : data.id  //将需要删除的newsId作为参数传入
                 },function(data){
                     layer.msg(data.msg,{time:2000});
                        if(data.code==200){
                            setTimeout(function(){
                                tableIns.reload();
                                layer.close(index);
                            },1000);
                        }else{
                            layer.msg(data.msg,{time:2000});
                            setTimeout(function(){
                                tableIns.reload();
                                layer.close(index);
                            },1000);

                        }

                 });
            });
        }
    });

})
