//in-therest.js
var app = getApp();
Page({
  data: {
    approve_on_off: true,//认证显示状态
    morning_work_time: '',
    afternoon_work_time: ''
  },

  //工作时间 提示
  approveClick: function () {
    var approve_on_off = this.data.approve_on_off;
    if (approve_on_off == true) {
      this.setData({
        approve_on_off: false
      })
    } else {
      this.setData({
        approve_on_off: true
      })
    }
  },
  onReady: function () {
    wx.setNavigationBarTitle({
      title: '垃圾回收',
    })
  },
  onLoad: function (options) {
    console.log(approve_on_off, 'approve_on_off')
    var that = this;
    that.setData({
      morning_work_time: options.morning_work_time,
      afternoon_work_time: options.afternoon_work_time
    })
  },

})
