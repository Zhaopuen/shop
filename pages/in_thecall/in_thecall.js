//in_thecall.js
var app = getApp();
const globalData = app.globalData;
Page({
  data: {
    // 倒计时
    countDownDay: 0,
    countDownHour: 0,
    countDownMinute: '',
    countDownSecond: '',
    // 桶 数量
    barrel:1,
    // 呼叫中
    call_text:'呼叫中',
    point:'···',
    callFlag:true,
    //重新呼叫
    callUrl:'',
    call_repeat:false,
    order_id:'',
    timer: '',//定时器名字
    countDownNum: '' 
  },

 

  onLoad: function(options) {
    var area_id = (wx.getStorageSync('area_id'));
    // var number = wx.getStorageSync("tongnum");
    console.log(typeof ((wx.getStorageSync("orderIds")).toString()),'yyyyyyyyyyy')
    this.setData({
      windowHeight: wx.getStorageSync('windowHeight'),
      barrel: wx.getStorageSync("tongnum")
    });
    wx.setNavigationBarTitle({
      title: '正在呼叫...',
    })
    var that = this;

    var time = 120;//30分钟换算成1800秒


    that.setData({
      timer: setInterval(function () {
        time = time - 1;
        var minute = parseInt(time / 60);
        var second = parseInt(time % 60);
        // countDownNum =  minute + ':' + second;
        that.setData({
          countDownNum: minute + ':' + second
        })
        if (that.data.countDownNum == "0:0") {
          clearInterval(that.data.timer);
          wx.showToast({
            title: '呼叫超时，请重新呼叫',
            icon: 'none'
          })
          wx.redirectTo({
            url: '../index/index',
          })
        }
      }, 1000)
    })
    // wx.request({
    //   url: globalData.serverurl + '/order_data.html',
    //   data: {
    //     order_id:options.order_id,
    //     uaid: globalData.uaid,
    //     ucid: globalData.ucid,
    //     mpid: wx.getExtConfigSync().mpid

    //   },
    //   method: 'POST',
    //   header: {
    //     'content-type': 'application/x-www-form-urlencoded' // 默认值
    //   },
    //   success(res) {
    //     that.setData({
    //       barrel:res.data.data.number,
    //       order_id:options.order_id
    //     })

    //     var totalSecond = res.data.data.last_time_int - res.data.request_time;
    //     console.log(totalSecond,'totalSecondtotalSecond')
    //     if(totalSecond > 3)
    //     {
    //       var interval = setInterval(function () {
    //         // 秒数
    //         var second = totalSecond;

    //         // 天数位
    //         var day = Math.floor(second / 3600 / 24);
    //         var dayStr = day.toString();
    //         if (dayStr.length == 1) dayStr = '0' + dayStr;

    //         // 小时位
    //         var hr = Math.floor((second - day * 3600 * 24) / 3600);
    //         var hrStr = hr.toString();
    //         if (hrStr.length == 1) hrStr = '0' + hrStr;

    //         // 分钟位
    //         var min = Math.floor((second - day * 3600 * 24 - hr * 3600) / 60);
    //         var minStr = min.toString();
    //         if (minStr.length == 1) minStr = '0' + minStr;

    //         // 秒位
    //         var sec = second - day * 3600 * 24 - hr * 3600 - min * 60;
    //         var secStr = sec.toString();
    //         if (secStr.length == 1) secStr = '0' + secStr;

    //         that.setData({
    //           countDownDay: dayStr,
    //           countDownHour: hrStr,
    //           countDownMinute: minStr,
    //           countDownSecond: secStr,
    //         });
    //         totalSecond--;
    //         if (totalSecond < 0) {
    //           clearInterval(interval);
    //           wx.showToast({
    //             icon: 'none',
    //             title: '呼叫超时,请重新呼叫',
    //           });
    //           that.setData({
    //             call_repeat: true,
    //             countDownDay: '0',
    //             countDownHour: '0',
    //             countDownMinute: '00',
    //             countDownSecond: '00',
    //             call_text: '重新呼叫',
    //             point: '',
    //             callUrl: '../in_thecall/in_thecall',
    //             callFlag: false
    //           });
    //         }
    //       }.bind(this), 1000);
    //     }else{
         
    //         wx.showToast({
    //           icon: 'none',
    //           duration:3000,
    //           title: '呼叫超时,请重新呼叫',
    //         });
    //         that.setData({
    //           call_repeat:true,
    //           countDownDay: '0',
    //           countDownHour: '0',
    //           countDownMinute: '00',
    //           countDownSecond: '00',
    //           call_text: '重新呼叫',
    //           point: '',
    //           callUrl: '../in_thecall/in_thecall',
    //           callFlag: false
    //         });
          
    //     }
        
      
    //   }
    // })
    // this.countDown()
  },

  countDown: function () {
    let that = this;
    let countDownNum = that.data.countDownNum;
    that.setData({
      timer: setInterval(function () {
        countDownNum--;
        that.setData({
          countDownNum: countDownNum
        })
        if (countDownNum == 0) {
          clearInterval(that.data.timer);
          wx.showToast({
            title: '呼叫超时，请重新呼叫',
            icon: 'none'
          })
          wx.navigateTo({
            url: '../index/index',
          })
        }
      }, 1000)
    })
  },
  // 取消呼叫
  cancelCall: function(){
    var that = this;
    wx.request({
      url: 'https://www.nx.tt/addon/collection/api/shop?act=' + 'cancel_order',
      data: {
        order_id: (wx.getStorageSync("orderIds")).toString(),
        shop_id: wx.getStorageSync("ShopId"),
        uaid: wx.getExtConfigSync().uaid,
        udid: wx.getExtConfigSync().udid,
        mpid: wx.getExtConfigSync().mpid,
      },
      method: 'POST',
      success:function(res){
        if(res.data.code == 1){
          clearInterval(that.data.timer);
          that.setData({
            call_text: '取消成功'
          })
          wx.redirectTo({
            url: '../index/index',
          })
        } else if(res.data.code == 0){
          wx.showToast({
            title: '订单取消失败',
            icon: 'none'
          })
        }
        console.log(res,"取消呼叫的res")
      }
    })
    
  },

  // 司机位置
  driverLocation: function(){
    wx.navigateTo({
      url: '../map_orders/map_orders',
    })
  },


  call_repeat:function()
  {
    var call_repeat = this.data.call_repeat;
    var that = this;
    var order_id= this.data.order_id;
    var area_id = (wx.getStorageSync('area_id'));
    if(call_repeat)
    {
      wx.request({
        url: globalData.serverurl + '/call_repeat.html',
        data: {
          order_id: order_id,
          mpid: wx.getExtConfigSync().mpid,
          uaid: wx.getExtConfigSync().uaid,
          ucid: wx.getExtConfigSync().udid
        },
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded' // 默认值
        },
        success(res) {
          if(res.data.code == '200')
          {
            wx.redirectTo({
              url: '../in_thecall/in_thecall?order_id=' + order_id
            })
          }else{
            wx.showModal({
              title: '提示',
              content: res.data.msg,
              showCancel: false
            })
          }
        }
      })
    }else{
      wx.showToast({
        icon: 'none',
        duration: 3000,
        title: '正在呼叫中，请稍等',
      });
    }
  },
  cancel_call:function()
  {
    var order_id = this.data.order_id;
    var openid = (wx.getStorageSync('openid'));
    wx.request({
      url: globalData.serverurl + '/cancel_call.html',
      data: {
        order_id: order_id,
        openid: openid,
        uaid: wx.getExtConfigSync().uaid,
        ucid: wx.getExtConfigSync().udid
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success(res) {
        if (res.data.code == '200') {
          wx.redirectTo({
            url: '../cancel_order/cancel_order?order_id=' + order_id
          })
        } else {
          wx.showModal({
            title: '提示',
            content: res.data.msg,
            showCancel: false
          })
        }
      }
    })
  }

})