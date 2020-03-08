// pages/bookkeeping/bookkeeping.js
var util = require("../../utils/util.js");
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    date: '',
    time: '',
    cost: '',
    typeArray: ['饮食', '购物', '交通', '娱乐', '学习'],
    typeIndex: 0,
  },

  /**
   * 事件函数
   */
  // 日期选择器
  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value
    })
  },
  // 时间选择器
  bindTimeChange: function (e) {
    this.setData({
      time: e.detail.value
    })
  },
  // 种类选择器
  bindPickerChange: function (e) {
    //console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },

  // 完成记账提交
  bkpSubmit:function(e){
    console.log(e.detail.value);
    //console.log(this.data.typeArray[e.detail.value.typeIndex])
    var that = this;
    var formData = e.detail.value;
    var {date, time, cost, typeIndex} = formData;

    // 判断 cost 是否为空
    if(!cost){
      wx.showToast({
        title: '请输入花费数额',
        icon: 'none',
        duration: 1000
      })
    }


    // 发送到服务器保存
    wx.request({
      url: 'http://192.168.1.89:8080/userOperation/saveBookkeeping',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'sessionId': app.globalData.sessionId
      },
      data: {
        'date': date,
        'time': time,
        'cost': cost,
        'type': that.data.typeArray[typeIndex]
      },
      success: function(res){
        console.log(res.data)
        var resData = res.data;
        if(resData.status == 200){
          // 显示成功提示
          wx.showToast({
            title: resData.msg,
            icon: 'success',
            duration: 1000
          });
          // 输入框更新
          that.setData({
            cost: ''
          });
          // 日期更新
          // var nowDate = util.formatDate(new Date());
          // that.setData({
          //   date: nowDate
          // });
          // 时间更新
          var nowTime = util.formatTime(new Date());
          that.setData({
            time: nowTime
          });
        }else if(resData.status == 500){
          // 显示提示
          wx.showToast({
            title: resData.msg,
            icon: 'success',
            duration: 1000
          });
        }
         
      },
      fail: function(res){
        console.log("失败：" + res.data)
      }

    })

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 设置为当前日期
    var nowDate = util.formatDate(new Date());
    this.setData({
      date: nowDate
    });
    // 设置为当前日期
    var nowTime = util.formatTime(new Date());
    this.setData({
      time: nowTime
    });
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