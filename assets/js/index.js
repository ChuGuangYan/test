$(()=>{
  getUserInfo()
  let layer = layui.layer
//点击退出按钮弹出提示框(layui中找的))
//给退出按钮绑定点击事件
$('#btnLogout').on('click',()=>{
  //提示用户是否退出
  layer.confirm('确定退出登录?', { icon: 3, title: '提示' },
      function (index) {
        //清空本地存储
        localStorage.removeItem('token')
        //2.重新跳转登录页面
    location.href = '/login.html'
        //关闭询问框
        layer.close(index);
      });
})
})
//获取基本信息
function  getUserInfo(){
  $.ajax({
    method:'GET',
    url:'/my/userinfo',
success:res=>{
  console.log(res);
  if(res.status!==0) return laui.layer.msg('获取用户信息失败')
  console.log('获取用户信息成功');
  //获取用户信息成功之后渲染用户头像
  rederAvatar(res.data)
}
  })
}
//渲染用户头像
function rederAvatar(user){
  //获取名称
  let name = user.nickname || user.username
  //设置欢迎文本
  $('#welcome').html(name + '欢迎你')
  //渲染用户头像
  if(user.user_pic !== null){
    //渲染图片头像
    $('.layui-nav-img').attr('src',user.user_pic).show()
    $('.text-avatar').hide()
  } else{
    $('.layui-nav-img').hide()
    //将其转为大写
    let first =name[0].toUpperCase()
$('.text-avatar').html(first).show()
  }
}