layui.use(['form','layer','laydate','table','laytpl'],function(){
    var form = layui.form,
        layer = parent.layer === undefined ? layui.layer : top.layer,
        $ = layui.jquery,
        laydate = layui.laydate,
        laytpl = layui.laytpl,
        table = layui.table;

    //新闻列表
    var tableIns = table.render({
        elem: '#newsList',
        url : '../../../Video/showVi',
        cellMinWidth : 95,
        page : true,
        response: {
            statusCode: 200 //规定成功的状态码，默认：0
        },
        height : "full-125",
        limit : 20,
        limits : [10,15,20,25],
        id : "newsListTable",
        cols : [[
            {type: "checkbox", fixed:"left", width:50},
            {field: 'id', title: 'ID', width:60, align:"center"},
            {field: 'title', title: '网课标题', width:200},
            {field: 'type', title: '网课类别', align:'center',templet:function(d){
                    if(d.type==1){
                        return '<span>硬笔书法</span>';
                    }else if(d.type==2){
                        return '<span>软笔书法</span>';
                    }else if(d.type==3){
                        return '<span>国画</span>';
                    }else if(d.type==5){
                        return '<span>点评指导</span>';
                    }else{
                        return '<span>美术</span>';
                    }

            }},
            {field: 'y_price', title: '网课原价', align:'center'},
            {field: 'x_price', title: '网课现价', align:'center'},

            {field: 'istop', title: '是否置顶', align:'center', templet:function(d){
                if(d.istop==1){
                    return '<input type="checkbox" name="newsTop" lay-filter="newsTop" lay-skin="switch" lay-text="是|否" checked id="'+d.id+'">'
                }else{
                    return '<input type="checkbox" name="newsTop" lay-filter="newsTop" lay-skin="switch" lay-text="是|否" id="'+d.id+'" >'
                }

            }},
            {field: 'date', title: '发布时间', align:'center', minWidth:110},
            {title: '操作', width:170, templet:'#newsListBar',fixed:"right",align:"center"}
        ]]
    });
//-----------------------------------------------------
    //搜索功能
    var $ = layui.$, active = {
        reload: function(){
            if($(".searchVal").val() != ''){
                table.reload('newsListTable', {
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
//-----------------------------------------------------



    //搜索【此功能需要后台配合，所以暂时没有动态效果演示】
    //$(".search_btn").on("click",function(){
    //    if($(".searchVal").val() != ''){
    //        table.reload("newsListTable", {
    //            page: {
    //                curr: 1 //重新从第 1 页开始
    //            },
    //            where: {
    //                id: $(".searchVal").val()  //搜索的关键字
    //            },
    //        })
    //    }else{
    //        layer.msg("请输入搜索的内容");
    //    }
    //});





    //是否置顶
    form.on('switch(newsTop)', function(data){
        var index = layer.msg('修改中，请稍候',{icon: 16,time:false,shade:0.8});
        console.log(data.elem.checked);
        console.log(data.elem.id);
        $.post("../../../Video/updateIstop",{id:data.elem.id},function(res){
            if(res.code==200){
                setTimeout(function(){
                    layer.close(index);
                    if(data.elem.checked){
                        layer.msg("置顶成功！");
                    }else{
                        layer.msg("取消置顶成功！");
                    }
                },500);
            }else{
                setTimeout(function(){
                    layer.close(index);
                    if(data.elem.checked){
                        layer.msg("置顶失败！");
                    }else{
                        layer.msg("取消置顶失败！");
                    }
                },500);
            }


        });


    })




    //添加文章
    function addNews(edit){
        var index = layui.layer.open({
            title : "添加文章",
            type : 2,
            content : "addVideo.html",
            success : function(layero, index){
                var body = layui.layer.getChildFrame('body', index);
                if(edit){
                    body.find(".newsName").val(edit.newsName);
                    body.find(".abstract").val(edit.abstract);
                    body.find(".thumbImg").attr("src",edit.newsImg);
                    body.find("#news_content").val(edit.content);
                    body.find(".newsStatus select").val(edit.newsStatus);
                    body.find(".openness input[name='openness'][title='"+edit.newsLook+"']").prop("checked","checked");
                    body.find(".newsTop input[name='newsTop']").prop("checked",edit.newsTop);
                    form.render();
                }
                setTimeout(function(){
                    layui.layer.tips('点击此处返回文章列表', '.layui-layer-setwin .layui-layer-close', {
                        tips: 3
                    });
                },500)
            }
        })
        layui.layer.full(index);
        //改变窗口大小时，重置弹窗的宽高，防止超出可视区域（如F12调出debug的操作）
        $(window).on("resize",function(){
            layui.layer.full(index);
        })
    }
    $(".addNews_btn").click(function(){
        addNews();
    })

    //批量删除
    $(".delAll_btn").click(function(){
        var checkStatus = table.checkStatus('newsListTable'),
            data = checkStatus.data,

            newsId = [];

        if(data.length > 0) {
            for (var i in data) {
                newsId.push(data[i].id);
            }
            console.log(newsId);

            //数组json序列化
            var jsonIds = JSON.stringify(newsId);
            //传数组去掉传参前面的[]符号
            //layui.jquery.ajaxSettings.traditional = true;
            layer.confirm('确定删除选中作品？', {icon: 3, title: '提示信息'}, function (index) {
                $.post("../../../Article/delAll",{
                    newsId : jsonIds  //将需要删除的newsId作为参数传入
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
            layer.msg("请选择需要删除的文章");
        }
    })

    //列表操作
    table.on('tool(newsList)', function(obj){
        var layEvent = obj.event,
            data = obj.data;

        if(layEvent === 'edit'){ //编辑
            addNews(data);
        } else if(layEvent === 'del'){ //删除
            //alert(data.id);
            layer.confirm('确定删除此作品？',{icon:3, title:'提示信息'},function(index){
                $.post('../../../Video/delVideo',{
                    videoId : data.id  //将需要删除的newsId作为参数传入
                },function(data){
                    if(data.code==200){
                        layer.msg('删除成功',{time:1000});
                        tableIns.reload();
                        layer.close(index);
                    }else{
                        layer.msg('删除失败',{time:1000});
                        tableIns.reload();
                        layer.close(index);
                    }

                })
            });
        } else if(layEvent === 'look'){ //预览
            var html='',htmls='',imgs='',imgSrc='',id=data.id;
            $.post("../../../Article/lookArticle",{id:id},function(res){
                console.log(res.data.title);
                if(res.code==200){
                    imgs=res.data.img_src;
                    var imgArr=imgs.split(',');
                    for(var i=0;i<imgArr.length;i++){
                        imgSrc +='<div class="layui-row">'+'<img src="http://localhost/wjsh/'+imgArr[i]+'" style="width: 200px;height: 200px;" alt=">'
                        '</div>'
                    }
                    var  imgSrcs=imgSrc;
                    console.log(imgSrcs);
                    html='<div class="layui-row">'+
                        '<div class="layui-col-xs6">'+
                        '<div class="grid-demo grid-demo-bg1">'+'作品标题'+'</div>'
                        +'</div>'+'<div class="layui-col-xs6">'
                        +'<div class="grid-demo">'+res.data.title+'</div>'+
                        '</div>'+'</div>'+'<div class="layui-row">'+
                        '<div class="layui-col-xs6">'+
                        '<div class="grid-demo grid-demo-bg1">'+'作品作者'+'</div>'
                        +'</div>'+'<div class="layui-col-xs6">'
                        +'<div class="grid-demo">'+res.data.author+'</div>'+
                        '</div>'+'</div>'+'<div class="layui-row">'+
                        '<div class="layui-col-xs6">'+
                        '<div class="grid-demo grid-demo-bg1">'+'作品摘要'+'</div>'
                        +'</div>'+'<div class="layui-col-xs6">'
                        +'<div class="grid-demo">'+res.data.abstract+'</div>'+
                        '</div>'+'</div>'+'<div class="layui-row">'+
                        '<div class="layui-col-xs6">'+
                        '<div class="grid-demo grid-demo-bg1">'+'作品分类目录'+'</div>'
                        +'</div>'+'<div class="layui-col-xs6">'
                        +'<div class="grid-demo">'+res.data.type+'</div>'+
                        '</div>'+'</div>'+'<div class="layui-row">'+
                        '<div class="layui-col-xs6">'+
                        '<div class="grid-demo grid-demo-bg1">'+'置顶（1：是 || 0：否）'+'</div>'
                        +'</div>'+'<div class="layui-col-xs6">'
                        +'<div class="grid-demo">'+res.data.istop+'</div>'+
                        '</div>'+'</div>'+imgSrcs;


                    layer.open({
                        type:1,
                        title:'作品预览',
                        shade:true,
                        shadeClose:true,
                        anim:0,
                        area:["800px","800px"],
                        content:html,
                    });
                }
            });



        }
    });

})