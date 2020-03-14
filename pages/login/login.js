// pages/login/login.js
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    account: '',
    password: '',
  },

    /**
   * 监听事件函数
   */
  loginSubmit:function(e){

    // wx.switchTab({
    //   url: '../home/home',
    // })

    console.log(e.detail.value);
    var formData = e.detail.value;
    var {account, password} = formData;     // 赋值
    var hint = "";    // 提示框文字
    // 判断是否输入为空
    if(!account){
      hint = "请输入账号";
    }else if(!password){
      hint = "请输入密码";
    }
    if(hint){
      wx.showToast({
        title: hint,
        icon: 'none',
        duration: 1000
      })
      return;
    }
    // 传送至服务器进行检验
    else{
      wx.request({
        url: 'http://192.168.1.89:8080/userLogin',
        method: 'POST',
        header: { 'content-type': 'application/x-www-form-urlencoded' },
        data: {
          'account': account,
          'password': password,
        },
        success: function (res) {
          var resData = res.data;
          // 收到https服务成功后返回
          console.log(resData);
          //console.log(resData.data.sessionId);
          // 登录成功
          if(res.data.status == 200){
            // 显示提示信息
            wx.showToast({
              title: resData.msg,
              icon: 'success',
              duration: 1000
            });

            // 跳转回登录界面
            setTimeout(function () {
              wx.switchTab({
                url: '../home/home',
              })
            }, 1500);

            // 保存用户的昵称
            app.globalData.userNetName = resData.data.userNetName;
            wx.setStorageSync('USER_NET_NAME', resData.data.userNetName);

            // 把 SessionId 和过期时间放在内存中的全局对象和本地缓存里边
            app.globalData.sessionId = resData.data.sessionId;
            wx.setStorageSync('SESSIONID', resData.data.sessionId);

            // 登录态保持
            var expiredTime = resData.data.expiredTime;
            app.globalData.expiredTime = expiredTime;
            wx.setStorageSync('EXPIREDTIME', expiredTime);
          }

          // 账号不存在 或 密码错误
          else if(res.data.status == 500){
            wx.showToast({
              title: resData.msg,
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