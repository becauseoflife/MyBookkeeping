// pages/changepwd/changepwd.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  changeSubmit: function(e){
    console.log(e.detail.value);
    var formData = e.detail.value;
    var {oldPwd, newPwd, okPwd} = formData;
    var isPostData = false;
    var hint = '';
    if(!oldPwd){
      hint = '请输入原密码'
    }else if(!newPwd){
      hint = '请输入新密码'
    }else if(!okPwd){
      hint = '请确认新密码'
    }
    if (hint) {
      wx.showToast({
        title: hint,
        icon: 'none',
        duration: 1000
      })
      return;
    }
    // 判断两次输入密码是否一样
    if (!hint && (newPwd !== okPwd)) {
      hint = '两次输入的密码不一样'
    } else if (!hint && (oldPwd === newPwd)){
      hint = '新密码和原密码相同'
    } else {
      isPostData = true;
    }
    wx.showToast({
      title: hint,
      icon: 'none',
      duration: 1000
    })

    // 上传到服务器
    if(isPostData){
      wx.request({
        url: 'http://192.168.1.89:8080/userOperation/changePassword',
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded',
          'sessionId': app.globalData.sessionId
        },
        data: {
          'oldPwd': oldPwd,
          'newPwd': newPwd
        },
        success: function(res){
          console.log(res.data)
          var resData = res.data;
          if(resData.status == 200){
            wx.showToast({
              title: resData.msg,
              icon: 'success',
              duration: 1500
            })
            // 跳转回用户界面
            setTimeout(function () {
              wx.switchTab({
                url: '../user/user',
              })
            }, 1500);
          }else if(resData.status == 500){
            wx.showModal({
              title: '服务器错误',
              content: resData.msg,
              confirmText: '我知道了',
              showCancel: false
            })
          }
        },
        fail: function(res){
          console.log(res.data)
          wx.showModal({
            title: '网络错误',
            content: res.errMsg,
            confirmText: '我知道了',
            showCancel: false
          })
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