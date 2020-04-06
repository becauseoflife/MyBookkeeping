// pages/bookkeeping/bookkeeping.js
var util = require("../../utils/util.js");
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    date: '',       // 日期选择器
    time: '',       // 时间选择器
    cost: '',       // 花费
    typeArray: [],  // 记账的种类
    typeImgArray: [], // 记账种类的图片位置
    typeIndex: 0,   // 种类类型的下标

    payBgdColor: '#f8e8e8',   // 选中支出 #f8e8e8 未选中 #EDEDED 
    payBorderColor: 'red',    // 选中 red 未选中 #EDEDED
    payTextColor: 'red',      // 选中 red 未选中 #aaa

    incomeBgdColor: '#EDEDED',    // 选中收入 #effcef 未选中 #EDEDED
    incomeBorderColor: '#EDEDED', // 选中 #1aad19 未选中 #EDEDED
    incomeTextColor: '#aaa',       // 选中 #1aad19 未选中 #aaa

    symbolOfCost: '-'     // 收入 + 支出 -
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
      typeIndex: e.detail.value
    })
  },

  // 选择支出
  selectPay: function(e){
    //console.log(e.currentTarget.dataset.id)
    // 符号
    this.setData({
      symbolOfCost: '-'
    })
    // 颜色的改变
    this.setData({
      payBgdColor: '#f8e8e8',   // 选中支出 #f8e8e8 未选中 #EDEDED 
      payBorderColor: 'red',    // 选中 red 未选中 #EDEDED
      payTextColor: 'red',      // 选中 red 未选中 #aaa
    })
    this.setData({
      incomeBgdColor: '#EDEDED',    // 选中收入 #effcef 未选中 #EDEDED
      incomeBorderColor: '#EDEDED', // 选中 #1aad19 未选中 #EDEDED
      incomeTextColor: '#aaa'       // 选中 #1aad19 未选中 #aaa
    })
    // 设置记账的种类
    this.setData({
      typeArray: app.globalData.payTypeArray,
      typeImgArray: app.globalData.payTypeImgArray,
      typeIndex: 0,   // 种类类型的下标
    });
  },

  // 选择收入
  selectIncome: function(e){
    //console.log(e.currentTarget.dataset.id)
    // 符号
    this.setData({
      symbolOfCost: '+'
    })
    // 颜色的改变
    this.setData({
      payBgdColor: '#EDEDED',   // 选中支出 #f8e8e8 未选中 #EDEDED 
      payBorderColor: '#EDEDED',    // 选中 red 未选中 #EDEDED
      payTextColor: '#aaa',      // 选中 red 未选中 #aaa
    })
    this.setData({
      incomeBgdColor: '#effcef',    // 选中收入 #effcef 未选中 #EDEDED
      incomeBorderColor: '#1aad19', // 选中 #1aad19 未选中 #EDEDED
      incomeTextColor: '#1aad19'       // 选中 #1aad19 未选中 #aaa
    })
    // 设置记账的种类
    this.setData({
      typeArray: app.globalData.incomeTypeArray,
      typeImgArray: app.globalData.incomeTypeImgArray,
      typeIndex: 0,   // 种类类型的下标
    });
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
      return;   // 结束
    }

    // 判断是否不再提醒
    var monthMaxCostTip = wx.getStorageSync('monthMaxCostTip')
    if (!monthMaxCostTip){
      console.log('执行:' + app.globalData.weekMaxCost)
        // 判断是否设置了额度限制 判断是否超过指定额度

        if (app.globalData.weekMaxCost >= 0 && this.data.symbolOfCost == '-'){
          var monthCost = parseFloat(wx.getStorageSync('monthCost')) + parseFloat(cost)
          if (monthCost > app.globalData.monthMaxCost) {
            wx.showModal({
              title: '本月消费超额提醒',
              content: '请注意！您本月的消费：' + monthCost + '\r\n超出了您设置的本周最大支出额度：\r\n' + app.globalData.monthMaxCost,
              confirmText: '我知道了',
              cancelText: '不再提醒',
              cancelColor: '#ff0000',
              success: function(res){
                // 点击本月不在提醒
                if(res.cancel){
                  wx.setStorageSync('monthMaxCostTip', true);
                }
              }
            })
          }
      }
    }

    // 判断是否不再提醒
    var weekMaxCostTip = wx.getStorageSync('weekMaxCostTip')
    if (!weekMaxCostTip){
      // 判断是否开启了额度限制
      if (app.globalData.monthMaxCost >= 0 && this.data.symbolOfCost == '-') {
        var weekCost = parseFloat(wx.getStorageSync('weekCost')) + parseFloat(cost)
        if (weekCost > app.globalData.weekMaxCost) {
          wx.showModal({
            title: '本周消费超额提醒',
            content: '请注意！您本周的消费：' + weekCost + '\r\n超出了您设置的本周最大支出额度：\r\n' + app.globalData.weekMaxCost,
            confirmText: '我知道了',
            cancelText: '不再提醒',
            cancelColor: '#ff0000',
            success: function (res) {
              // 点击本周不再提醒
              if (res.cancel) {
                wx.setStorageSync('weekMaxCostTip', true)
              }
            }
          })
        }
      }
    }


    // 更新缓存中的周和月花费
    wx.setStorageSync('weekCost', weekCost)
    wx.setStorageSync('monthCost', monthCost)


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
        'cost': that.data.symbolOfCost + cost,
        'type': that.data.typeArray[typeIndex],
        'imgPath': that.data.typeImgArray[typeIndex],
        'symbolOfCost': that.data.symbolOfCost
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
          wx.showModal({
            title: '服务器错误',
            content: resData.msg,
            confirmText: '我知道了',
            showCancel: false
          })
        }
         
      },
      fail: function(res){
        wx.showModal({
          title: '网络错误',
          content: resData.msg,
          confirmText: '我知道了',
          showCancel: false
        })
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
    // 设置记账的种类
    this.setData({
      typeArray: app.globalData.payTypeArray,
      typeImgArray: app.globalData.payTypeImgArray
    });

    // 获取周花费和月花费
    wx.request({
      url: 'http://192.168.1.89:8080/userOperation/getWeekMonthCost',
      menthod: 'GET',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'sessionId': app.globalData.sessionId
      },
      success: function (res) {
        console.log(res.data)
        var resData = res.data;
        if (resData.status == 200) {
          wx.setStorageSync('weekCost', resData.data.weekCost)
          wx.setStorageSync('monthCost', resData.data.monthCost)
        }
        else if(resData.status == 500){
          wx.showToast({
            title: resData.msg,
            icon: 'none',
            duration: 1000
          }) 
        }
      },
      fail: function (res) {
        console.log(res.data)
      }
    })

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