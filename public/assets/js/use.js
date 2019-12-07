//当表单发生提交行为的时候
$('#userForm').on('submit',function(){
    //获取用户在表单中输入的内容并将内容格式化成参数字符串
    var formData = $(this).serialize();
    console.log(formData);
//向服务端发送添加用户请求
    $.ajax({
        type:'POST',
        url:'/users',
        data:formData,
        success:function(){
            location.reload();
            alert('添加成功')
            
        },
        error:function(){
            alert('用户添加失败')
        }
    })
    //阻止表单默认提交行为
    return false
});
//当用户选择文件时
$('#avatar').on('change',function(){
    //用户选择到的文件
   // console.log(this.files[0]);
   var formData = new FormData();

   formData.append('avatar',this.files[0]);

   $.ajax({
       type:'post',
       url:'/upload',
       data:formData,
       //告诉ajax方法不要解析参数
       processData:false,
       //告诉ajax方法不要设置参数类型
       contentType:false,
       success:function(res){
        // console.log(res);
        //实现图像预览功能
        $('#preview').attr('src',res[0].avatar);
        $('#hiddenAvatar').val(res[0].avatar);
        
       }
   })
     
});
$('#modifyBox').on('change','#avatar',function(){
     //用户选择到的文件
   // console.log(this.files[0]);
   var formData = new FormData();

   formData.append('avatar',this.files[0]);

   $.ajax({
       type:'post',
       url:'/upload',
       data:formData,
       //告诉ajax方法不要解析参数
       processData:false,
       //告诉ajax方法不要设置参数类型
       contentType:false,
       success:function(res){
        // console.log(res);
        //实现图像预览功能
        $('#preview').attr('src',res[0].avatar);
        $('#hiddenAvatar').val(res[0].avatar);
        
       }
   })
})
// 向服务器发送请求 索要用户列表数据
$.ajax({
    type:'get',
    url:'/users',
    success:function(res){
        //console.log(res);
        //将模板引擎与字符串拼接
        var html = template('userTpl',{data:res});
       // console.log(html);
    //将拼接好的字符串显示在页面上
        $('#userBox').html(html);
        
        
    }
});
// 通过事件委托的方式为编辑按钮添加点击事件
$('#userBox').on('click','.edit',function(){
    //获取点击编辑按钮的id
    var id = $(this).attr('data-id');
    //console.log(id);
    //通过id发送ajax请求用户信息
    $.ajax({
        type:'GET',
        url:'/users/'+ id,
        success:function(res){
            //console.log(res);
           var html = template('modifyTpl',res);
           //console.log(html);
           $('#modifyBox').html(html);
           

        }
        
    })


    
});
//为修改表单添加表单提交事件
$('#modifyBox').on('submit','#modifyForm',function(){
    //获取用户在表单中输入的内容
    var formData = $(this).serialize();
    //获取要修改的那个用户的值
    var id = $(this).attr('data-id');
    //发送请求 修改用户信息
    $.ajax({
        type:'put',
        url:'/users/'+ id,
        data:formData,
        success:function(response){
            //console.log(response);
            //修改用户信息成功 重新加载页面
            location.reload();
            
        }
    })
//阻止表单默认提交行为
    return false;
});
// 删除功能
$('#userBox').on('click','.delete',function(){
    //alert('真的要删除吗？');
    if(confirm('确定要删除吗')){
        //获取该元素id
        var id = $(this).attr('data-id');
        //console.log(id);
        $.ajax({
            type:'delete',
            url:'/users/'+id,
            success:function(){
                location.reload();
            }
        })
        
    }
});
// 获取全选按钮
var selectAll = $('#selectAll');
//当全选按钮状态发生改变时
selectAll.on('change',function(){
    var status = $(this).prop('checked');
   // console.log(status);
   //获取所有用的
   $('#userBox').find('input').prop('checked',status);
    if(status){
        $('#deleteMany').show();
    }else{
        $('#deleteMany').hide();
    }
});
$('#userBox').on('change','.userStatus',function(){
    var inputs = $('#userBox').find('input');
    //如果选中用户个数等于总用户个数
     if(inputs.length == inputs.filter(':checked').length){
        selectAll.prop('checked',true)
        //只要有未选中的
     }else{
        selectAll.prop('checked',false)
     }
     //只要有用户选中，就展示批量删除按钮
     if(inputs.filter(':checked').length>0){
        $('#deleteMany').show();
     }else{
        $('#deleteMany').hide();
     }

})