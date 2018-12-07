/**
 * Created by kangshuai on 2018/10/16.
 */
/**
 * Created by kangshuai on 2018/10/6.
 */
layui.use(['form', 'layer', 'layedit', 'laydate', 'upload'], function () {
    var form = layui.form
    layer = parent.layer === undefined ? layui.layer : top.layer,
        laypage = layui.laypage,
        upload = layui.upload,
        layedit = layui.layedit,
        laydate = layui.laydate,
        $ = layui.jquery;

    //用于同步编辑器内容到textarea
    layedit.sync(editIndex);

    //上传文件
    var src = '', i = 0, j = 0;
    //上传图片
    upload.render({
        elem: '#test2',
        url: '../../../public/index/Article/upLoad',
        method: "post",  //此处是为了演示之用，实际使用中请将此删除，默认用post方式提交
        multiple: true,
        number: 6,
        auto: false,
        bindAction: "#btn1",
        choose: function (obj) {
            var files = this.files = obj.pushFile();
            if (Object.keys(files).length == 1) {
                $("#test2").hide();
            }

            //预读本地文件示例，不支持ie8
            obj.preview(function (index, file, result) {

                $('#demo2').append('<li style="display: inline-block"><img src="' + result + '" alt="' + file.name + '"  title="' + file.name + '" class="layui-upload-img" style="width: 100px;height: 100px;margin-left: 20px;"></li>');
                //删除开关
                //    <i class="layui-icon img_del" style="color: red;">&#xe640;</i>

                //$("body").on("click",".img_del",function(){
                //    var _this = $(this);
                //    layer.confirm('确定删除图片"'+_this.siblings('img').attr("title")+'"吗？',{icon:3, title:'提示信息'},function(index){
                //        delete files[index];
                //        _this.parents("li").hide(1000);
                //        setTimeout(function(){
                //            _this.parents("li").remove();
                //        },950);
                //        layer.close(index);
                //
                //    });
                //})


            });


        },

        allDone: function (obj) { //当文件全部被提交后，才触发

            var src_s = src.substr(0, src.length - 1);
            $("#srcArr").attr('value', src_s);

            $("#test2").attr("disabled", "disabled").addClass("layui-disabled");
            $("#btn1").text("上传成功，待发布 >>>>>>").attr("disabled", "disabled").addClass("layui-disabled");
        },
        done: function (res, index, upload) {
            if (res.code == 200) {
                layer.msg('上传成功', { time: 1000 });
                src += res.data.src + ',';
                console.log(src);

            }
            //$('#test2').append('<input type="hidden" name="pc_src[' + j + ']"   value="' + res.data.src + '" />');
            //j++;
            //$("#count").val(j);
        }

    });

    //上传视频
    //upload.render({
    //    elem: '#test2',
    //    url: '../../../public/index/Video/upLoadVideo',
    //    method : "post",  //此处是为了演示之用，实际使用中请将此删除，默认用post方式提交
    //    multiple: true,
    //    number:6,
    //    accept:'video',
    //    auto:false,
    //    bindAction:"#btn1",
    //    //不限制上传的视频的大小
    //    size:0,
    //    choose:function(obj){
    //        var files = this.files = obj.pushFile();
    //        if(Object.keys(files).length == 1){
    //            $("#test2").hide();
    //        }
    //
    //        //预读本地文件示例，不支持ie8
    //        obj.preview(function(index, file, result){
    //
    //
    //
    //            $('#demo2').append( '<div class="layui-upload-list">'+
    //                '<table class="layui-table">'+
    //               ' <thead>'+
    //               ' <tr><th>文件名</th>'+
    //               ' <th>大小</th>'+
    //                '</tr></thead>'+
    //                '<tbody id="demoList">'+'<tr>'+'<td>'+ file.name +'</td>'+
    //                '<td>'+ (file.size/1014).toFixed(1) +'kb</td>'+'</tr>'+'</tbody>'+
    //                '</table>');
    //            //删除开关
    //            //    <i class="layui-icon img_del" style="color: red;">&#xe640;</i>
    //
    //            //$("body").on("click",".img_del",function(){
    //            //    var _this = $(this);
    //            //    layer.confirm('确定删除图片"'+_this.siblings('img').attr("title")+'"吗？',{icon:3, title:'提示信息'},function(index){
    //            //        delete files[index];
    //            //        _this.parents("li").hide(1000);
    //            //        setTimeout(function(){
    //            //            _this.parents("li").remove();
    //            //        },950);
    //            //        layer.close(index);
    //            //
    //            //    });
    //            //})
    //
    //
    //        });
    //
    //
    //    },
    //
    //    allDone: function(obj){ //当文件全部被提交后，才触发
    //
    //        //var src_s=src.substr(0,src.length-1);
    //        //$("#srcArr").attr('value',src_s);
    //        //
    //        //$("#test2").attr("disabled","disabled").addClass("layui-disabled");
    //        //$("#btn1").text("上传成功，待发布 >>>>>>").attr("disabled","disabled").addClass("layui-disabled");
    //    },
    //    done: function(res, index, upload){
    //        if(res.code==200){
    //            layer.msg('上传成功',{time:1000});
    //            src =res.data.src;
    //            $("#src").attr('value',src);
    //
    //            $("#test2").attr("disabled","disabled").addClass("layui-disabled");
    //            $("#btn1").text("上传成功，待发布 >>>>>>").attr("disabled","disabled").addClass("layui-disabled");
    //
    //        }
    //        //$('#test2').append('<input type="hidden" name="pc_src[' + j + ']"   value="' + res.data.src + '" />');
    //        //j++;
    //        //$("#count").val(j);
    //    }
    //
    //});


    //格式化时间
    function filterTime(val) {
        if (val < 10) {
            return "0" + val;
        } else {
            return val;
        }
    }
    //定时发布
    var time = new Date();
    var submitTime = time.getFullYear() + '-' + filterTime(time.getMonth() + 1) + '-' + filterTime(time.getDate()) + ' ' + filterTime(time.getHours()) + ':' + filterTime(time.getMinutes()) + ':' + filterTime(time.getSeconds());
    laydate.render({
        elem: '#release',
        type: 'datetime',
        trigger: "click",
        done: function (value, date, endDate) {
            submitTime = value;
        }
    });
    form.on("radio(release)", function (data) {
        if (data.elem.title == "定时发布") {
            $(".releaseDate").removeClass("layui-hide");
            $(".releaseDate #release").attr("lay-verify", "required");
        } else {
            $(".releaseDate").addClass("layui-hide");
            $(".releaseDate #release").removeAttr("lay-verify");
            submitTime = time.getFullYear() + '-' + (time.getMonth() + 1) + '-' + time.getDate() + ' ' + time.getHours() + ':' + time.getMinutes() + ':' + time.getSeconds();
        }
    });
    form.on('switch(sw)', function (data) {
        //console.log(data.elem.checked); //开关是否开启，true或者false
        //var ck=data.elem.checked;
    });

    form.verify({
        title: function (val) {
            if (val == '') {
                return "网课标题不能为空";
            }
        },
        type: function () {
            if ($("#type").find("option:selected").val() == 0) {
                return "请选择网课类别";
            }
        },
        y_price: function (val) {
            if (val == '') {
                return "请填写原价";
            }
        },
        x_price: function (val) {
            if (val == '') {
                return "请填写优惠价";
            }
        },
        pic_url: function (val) {
            if (val == '') {
                return "请填写视频地址";
            }
        }


    })
    form.on("submit(addNews)", function (data) {

        var src = $("#pic_url").val() == '' ? $("#src").val() : $("#pic_url").val();
        //弹出loading
        var index = top.layer.msg('数据提交中，请稍候', { icon: 16, time: false, shade: 0.8 });
        //实际使用时的提交信息
        $.post("../../../Video/addVideo", {
            title: $(".title").val(),  //网课标题
            type: $("#type").find("option:selected").val(),  // 网课类别
            yprice: $(".y_price").val(),  //原价格
            xprice: $(".x_price").val(),  //现价格
            pic_src: src,
            newsTop: $("input[name='newsTop']").is(":checked") ? 1 : 0,  //是否置顶
            classinfo: $(".classinfo").val(),
            classset: $(".classset").val(),
            cteacher: $(".cteacher").val(),
        }, function (res) {
            if (res.code == 200) {

                setTimeout(function () {
                    top.layer.close(index);
                    top.layer.msg("网课发布成功");
                    layer.closeAll("iframe");
                    //刷新父页面
                    parent.location.reload();
                }, 500);
                return false;
            } else {
                top.layer.msg("网课发布失败！");
            }
        });

    })

    //预览
    form.on("submit(look)", function () {
        layer.alert("此功能需要前台展示，实际开发中传入对应的必要参数进行文章内容页面访问");
        return false;
    })

    //创建一个编辑器
    var editIndex = layedit.build('news_content', {
        height: 535,
        uploadImage: {
            url: "../../json/newsImg.json"
        }
    });

})