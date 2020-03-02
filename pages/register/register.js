// pages/register/register.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    netName:'',
    name:'',
    telephone:'',
    account:'',
    password_one:'',
    password_two:''
  },

  /**
   * 监听事件函数
   */
  registerSubmit:function(e){
    console.log(e.detail.value);
    var isPostData = false;
    var formData = e.detail.value;
    var {netName, name, telephone, account, password_one, password_two} = formData;
    var hint = "";
    // 判断输入内容是否为空
    if(!netName){
      hint = "请输入昵称";
    }else if(!name){
      hint = "请输入真实姓名";
    }else if(!telephone){
      hint = "请输入电话号码";
    }else if(!account){
      hint = "请输入账号";
    }else if(!password_one){
      hint = "请输入密码";
    }else if(!password_two){
      hint = "请再次确认密码";
    }
    if(hint){
      wx.showToast({
        title: hint,
        icon: 'none',
        duration: 1000
      })
      return;
    }
    // console.log(isPostData);
    // 判断两次输入密码是否一样
    if( !hint && (password_one !== password_two) ){
      wx.showToast({
        title: "两次输入的密码不一样",
        icon: 'none',
        duration: 1000
      })
      return;
    }else{
      isPostData = true;
    }
    // 上传至服务器
    // console.log(isPostData);
    if(isPostData){
      wx.request({
        url: 'http://192.168.1.89:8080/register',
        header: { 'content-type': 'application/x-www-form-urlencoded' },
        method: 'POST',
        data:{
          'netName' : netName,
          'name' : name,
          'telephone' : telephone,
          'account' : account,
          'password' : password_one
        },
        success: function (res) {
          // 收到https服务成功后返回
          console.log(res.data);
          // 注册成功
          if(res.data.status == 200){
            wx.showToast({
              title: res.data.data,
              icon: 'success',
              duration: 1500
            });
            // 跳转回登录界面
            setTimeout(function(){
              wx.redirectTo({
                url: '../login/login',
              })
            }, 1500);
            
          }
          // 账户已存在
          else if(res.data.status == 500){
            wx.showToast({
              title: res.data.msg,
              icon: 'none',
              duration: 2000
            })
          }
        },
        fail: function () {
          // 发生网络错误等情况触发
          console.log("网络请求失败");
        }   
      })
    }

  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})