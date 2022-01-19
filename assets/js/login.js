$(() => {
  //点击注册链接
  $('#link_reg').on('click', function () {
    $('.reg-box').show()
    $('.login-box').hide()
  })
  //点击登入链接
  $('#link_login').on('click', function () {
    $('.login-box').show()
    $('.reg-box').hide()
  })
  //从layui 中获取form 对象、layer弹出框
  let form = layui.form
  let layer = layui.layer
  //自定义校验规则
  form.verify({
    //psd的校验规则，不正确的时候出现错误提示，逗号后面是错误提示
    pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
    //校验两次密码是否一致
    repwd: value => {
      let pwd = $('.reg-box [name=password]').val()
      if (pwd !== value) return '量词密码不一致'
    }
  })
  //监听注册表单提交事件
  $('#form_reg').on('submit',function(e){
    //阻止表单默认提交行为
    e.preventDefault()
    //发起ajax请求
    let data = {
      username:$('#form_reg [name=username]').val(),
      password:$('#form_reg [name=password]').val()
    }
    $.ajax({
      method:'POST',
      url:'/api/reguser',
      data:data,
      success:res=>{
        console.log(res); 
      if(res.status !==0) return layer.msg(res.message)
      layer.msg('注册成功，请登录')
      //手动模拟 登录点击行为
      $('#link_login') .click()
      }

    })
  })
  //监听登录表单行为
  $('#form_login').on('submit',function(e){
    e.preventDefault()
    $.ajax({
      method:'POST',
url:'/api/login',
//获取整个表单数据
data:$(this).serialize(),
success:res=>{
  console.log(res);
  if(res.status!==0) return layer.msg('登录失败')
  layer.msg('登录成功')
  //将登录成功后的token字符串保存到 localStorage
  //setItem存数据 getItem取数据
  localStorage.setItem('token',res.token)
  location.href = '/index.html'
}
    })
  })
})