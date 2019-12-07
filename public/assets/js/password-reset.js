//当修改密码表单发生提交行为
$('#modifyForm').on('submit',function(){
    //获取表单中的内容
   var formData =  $(this).serialize();
   $.ajax({
       type:'PUT',
       url:'/users/password',
       data:formData,
       success:function(){
           location.href = "/admin/login.html"
       }
   })
    //阻止表单默认提交行为
    return false;
})