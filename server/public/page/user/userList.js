layui.use(['form','layer','table','laytpl'],function(){
    var form = layui.form,
        layer = parent.layer === undefined ? layui.layer : top.layer,
        $ = layui.jquery,
        laytpl = layui.laytpl,
        table = layui.table;

    //用户列表
    var tableIns = table.render({
        elem: '#userList',
        url : '../../../Admin/showAdmin',
        response: {
            statusCode: 200 //规定成功的状态码，默认：0
        },
        cellMinWidth : 95,
        page : true,
        height : "full-125",
        limits : [10,15,20,25],
        limit : 20,
        id : "userListTable",
        cols : [[
            //{type: "checkbox", fixed:"left", width:50},
            {field: 'id', title: '用户ID', minWidth:50, align:"center"},
            {field: 'username', title: '用户名', minWidth:100, align:"center"},
            {field: 'status', title: '用户状态',  align:'center',templet:function(d){
                return d.status == "1" ? "正常使用" : "限制使用";
            }},

            {field: 'last_date', title: '最后登录时间', align:'center',minWidth:150},
            {title: '操作', minWidth:175, templet:'#userListBar',fixed:"right",align:"center"}
        ]]
    });

    //搜索【此功能需要后台配合，所以暂时没有动态效果演示】
    $(".search_btn").on("click",function(){
        if($(".searchVal").val() != ''){
            table.reload("newsListTable",{
                page: {
                    curr: 1 //重新从第 1 页开始
                },
                where: {
                    key: $(".searchVal").val()  //搜索的关键字
                }
            })
        }else{
            layer.msg("请输入搜索的内容");
        }
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
                    console.log(edit.id);
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
        var checkStatus = table.checkStatus('userListTable'),
            data = checkStatus.data,
            newsId = [];
        if(data.length > 0) {
            for (var i in data) {
                newsId.push(data[i].newsId);
            }
            layer.confirm('确定删除选中的用户？', {icon: 3, title: '提示信息'}, function (index) {
                // $.get("删除文章接口",{
                //     newsId : newsId  //将需要删除的newsId作为参数传入
                // },function(data){
                tableIns.reload();
                layer.close(index);
                // })
            })
        }else{
            layer.msg("请选择需要删除的用户");
        }
    })

    //列表操作
    table.on('tool(userList)', function(obj){
        var layEvent = obj.event,
            //所选中的行内数据
            data = obj.data;

        if(layEvent === 'edit'){ //编辑
            addUser(data);
        }else if(layEvent === 'usable'){ //启用禁用
            var index = layer.msg('操作中，请稍候',{icon: 16,time:false,shade:0.8});

            $.post("../../../Admin/updateStatus",{id:data.id},function(res){
                if(res.code==200){
                    setTimeout(function(){

                        layer.msg("状态更新成功!");
                        tableIns.reload();
                        layer.close(index);


                    },500);
                }else{
                    setTimeout(function(){

                        layer.msg("状态更新失败！");
                        tableIns.reload();
                        layer.close(index);
                    },500);
                }


            });

        }else if(layEvent === 'del'){ //删除
            layer.confirm('确定删除此用户？',{icon:3, title:'提示信息'},function(index){

                $.post("../../../Admin/delAdmin",{
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
