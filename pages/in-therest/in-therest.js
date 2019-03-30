//in-therest.js
var app = getApp();
Page({
  data: {
    approve_on_off:true,//认证显示状态
    morning_work_time:'',
    afternoon_work_time:''
  },
  
  //工作时间 提示
  approveClick:function(){
    var approve_on_off = this.data.approve_on_off;
    if (approve_on_off == true){
      this.setData({
        approve_on_off: false
      })
    }else{
      this.setData({
        approve_on_off: true
      })
    }
  },
  onReady:function () {
    wx.setNavigationBarTitle({
      title: '垃圾回收',
    })
  },
  onLoad: function (options) {
    // console.log(approve_on_off,'approve_on_off')
    // var that = this;
    // that.setData({
    //   morning_work_time: options.morning_work_time,
    //   afternoon_work_time: options.afternoon_work_time
    // })
    var that = this;
    wx.request({
      url: 'https://www.nx.tt/app/user/config?key=bltbasic&uaid=2&udid=0',
      success: function (res) {
        var one = (res.data.data.value[0].afternoon_work_time).substring(0, 5);
        var two = (res.data.data.value[0].afternoon_work_time).substring(7, 11);
        var three = (res.data.data.value[0].morning_work_time).substring(0, 5);
        var four = (res.data.data.value[0].morning_work_time).substring(7, 11);
        that.setData({
          morning_work_time: res.data.data.value[0].morning_work_time,
          afternoon_work_time: res.data.data.value[0].afternoon_work_time
        })
      }
    })
    
  },
 
})
