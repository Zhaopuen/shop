//index.js
var app = getApp();
const globalData = app.globalData;
var get_address = require('../../utils/util.js');
function judge(m) { return m < 10 ? '0' + m : m; }
function filter_getTime(shijianchuo) {
  if (!shijianchuo) {
    return '--'
  }
  var shijianchuo = parseInt(shijianchuo)
  var time = new Date(shijianchuo);
  var yy = time.getFullYear();
  var m = time.getMonth() + 1;
  var dd = time.getDate();
  var hh = time.getHours();
  var mm = time.getMinutes();
  var ss = time.getSeconds();
  return judge(hh) + ':' + judge(mm);
}

var time_range = function (beginTime, endTime, nowTime) {
  var strb = beginTime.split(":");
  if (strb.length != 2) {
    return false;
  }

  var stre = endTime.split(":");
  if (stre.length != 2) {
    return false;
  }

  var strn = nowTime.split(":");
  if (stre.length != 2) {
    return false;
  }
  var b = new Date();
  var e = new Date();
  var n = new Date();

  b.setHours(strb[0]);
  b.setMinutes(strb[1]);
  e.setHours(stre[0]);
  e.setMinutes(stre[1]);
  n.setHours(strn[0]);
  n.setMinutes(strn[1]);

  if (n.getTime() - b.getTime() > 0 && n.getTime() - e.getTime() < 0) {
    return true;
  } else {
    // alert ("当前时间是：" + n.getHours () + ":" + n.getMinutes () + "，不在该时间范围内！");
    return false;
  }
}

function timing(that) {
  var seconds = that.data.seconds
  that.data.timers = setTimeout(function () {
    that.setData({
      seconds: seconds + 1
    });
    timing(that);
  } , 1000)
  formatSeconds(that)
}
function formatSeconds(that) {
  var mins = 0, hours = 0, seconds = that.data.seconds, time = ''
  if (seconds < 60) {
    that.setData({
      time: formatTime(mins) + ':' + formatTime(seconds)
    });
  } else if (seconds < 3600) {
    mins = parseInt(seconds / 60)
    seconds = seconds % 60
    that.setData({
      time: formatTime(mins) + ':' + formatTime(seconds)
    });
  } else {
    mins = parseInt(seconds / 60)
    seconds = seconds % 60
    hours = parseInt(mins / 60)
    mins = mins % 60
    that.setData({
      time: formatTime(hours) + ':' + formatTime(mins) + ':' + formatTime(seconds)
    });
  }
  // that.setData({
  //   time: formatTime(mins) + ':' + formatTime(seconds)
  // });
}
function formatTime(num) {
  if (num < 10)
    return '0' + num
  else
    return num + ''
}
function charging(that) {
  console.log(that.data.seconds,'999999999')
  if (that.data.seconds < 600) {
    that.setData({
      cost: 1
    })
  }
}
Page({
  data: {
    approve_on_off:false,//认证显示状态
    barrel:1,//桶 数量
    max_barrel:5,//最大桶数,
    code:'',
    order_status:'',
    renzhengInfo:'',
    latValue: '',
    lngValue:'',
    clientIds: '',
    shopNames: '',
    shopIds: '',
    shopPhones: '',
    callIf: true,
    call_text: '呼叫中',
    point: '···',
    callFlag: true,
    locationIf: false,
    btnvalue: '取消呼叫',
    donghua: true,
    countDownNum: '02:00',
    timeIf: false,
    setInter: '',
    num: 1,
    seconds: 0,
    time: '00:00:00',
    cost: 0,
    timers: "",
    toptext: '司机即将到达，请准备好泔水桶',
    morning_work_time: '',
    afternoon_work_time: '',
    worktime: false,
    resting: false
  },
  //桶 数量 减
  reduceClick:function(){
    var barrel = this.data.barrel;
    if (barrel <= 1) {
      return;
    } else {
      barrel = barrel-1;
      this.setData({
        barrel: barrel
      })
    }
  },
  //桶 数量 加
  addClick: function () {
    var barrel = this.data.barrel;
    var max_barrel = this.data.max_barrel;
    if (barrel >= max_barrel) {
      wx.showModal({
        title: '最多选择5桶',
        icon: 'none',
      })
      return;
    } else {
      barrel = barrel + 1;
      this.setData({
        barrel: barrel
      })
    }
  },
  //桶 数量 重置
  resetClick:function(){
    var barrel = this.data.barrel;
    this.setData({
      barrel: 1
    })
  },

  onReady:function () {
    wx.setNavigationBarTitle({
      title: '垃圾回收',
    })
  },


  onLoad: function(options){
    console.log(options,'options')

    var that = this;
    
    wx.request({
      url: 'https://www.nx.tt/addon/collection/api/join',
      data: {
        uaid: globalData.uaid,
        openid: globalData.openid,
        mpid: globalData.mpid,
        udid: globalData.udid
      },
      method: 'GET',
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success(res) {
        console.log(res.data.data.lat, 'indexres')
        that.setData({
          latValue: res.data.data.lat,
          lngValue: res.data.data.lng,
          shopIds: res.data.data.id,
          shopNames: res.data.data.name,
          shopPhones: res.data.data.phone
        })
        wx.setStorageSync("shopIds", res.data.data.id)
        wx.setStorageSync("shopNames", res.data.data.name)
        wx.setStorageSync("shopPhones", res.data.data.phone)
      }
    })

    var openid = wx.getStorageSync("openid");
    // var socketOpen = false
    // //注册信息
    // var data = {
      
    // }
    // var socketMsgQueue = JSON.stringify(data)
    // //建立连接
    // wx.connectSocket({
    //   url: "wss://www.nx.tt/wss",
    // })
    // wx.onSocketOpen(function (res) {
    //   console.log('WebSocket连接已打开！')
    //   socketOpen = true
    //   console.log('数据发送中' + socketMsgQueue)
    //   sendSocketMessage(socketMsgQueue)
    // })
    // function sendSocketMessage(msg) {
    //   if (socketOpen) {
    //     wx.sendSocketMessage({
    //       data: msg
    //     })
    //   } else {
    //     socketMsgQueue.push(msg)
    //   }
    // }
    // wx.onSocketError(function (res) {
    //   console.log('WebSocket连接打开失败，请检查！')
    // })
    wx.onSocketMessage(function (res) {
      console.log('收到服务器内容：' + JSON.stringify(res))
      var resJson = JSON.parse(res.data);
      if (resJson.type == "init"){
        that.setData({
          clientIds: resJson.client_id
        })
        wx.setStorageSync("clientIds",resJson.client_id)
        wx.setStorageSync("clientOrders", resJson.type)
      }
      if (resJson.type == "receive_order"){
        that.setData({
          locationIf: true,
          call_text: "已接单",
          btnvalue:'司机位置',
          donghua: false, 
          timeIf: false, 
          seconds: 0
        })
        console.log(resJson.driver_name)
        clearTimeout(that.data.timers)
        wx.setStorageSync("driverPhone", resJson.driver_phone)
        wx.setStorageSync("driverName", resJson.driver_name)
        wx.setStorageSync("lat", resJson.lat);
        wx.setStorageSync("lng", resJson.lng);
      }
      if (resJson.type == "finish_order"){
        that.setData({
          callIf: true,
          timeIf: false,
          locationIf: false
        })
      }
    
    })

    var myDate = new Date();
    var h = myDate.getHours();       //获取当前小时数(0-23)
    var s = myDate.getMinutes();     //获取当前分钟数(0-59)
    var all = 10;

    console.log(all,'时间')
    wx.request({
      url: 'https://www.nx.tt/app/user/config?key=bltbasic&uaid=2&udid=0',
      success: function (res) {
        console.log(res.data.data.value[0].morning_work_time,res.data.data.value[0].afternoon_work_time,'ddddddddddd')
        var one = (res.data.data.value[0].afternoon_work_time).substring(0, 5);
        var two = (res.data.data.value[0].afternoon_work_time).substring(6, 11);
        var three = (res.data.data.value[0].morning_work_time).substring(0, 5);
        var four = (res.data.data.value[0].morning_work_time).substring(6, 11);
        console.log(one,two,three,four,"1234")
        var if1 = time_range(three, four, filter_getTime(new Date().getTime()));
        var if2 = time_range(one, two, filter_getTime(new Date().getTime()));
        console.log(if1, '下午时间')
        console.log(if2, '早上时间')
        // if (if2 == false && if1 == false){
        //   that.setData({
        //     toptext: '请在工作时间内呼叫清运车',
        //     worktime: true,
        //     resting: true,
        //     callIf: true,
        //     timeIf: false,
        //     morning_work_time: res.data.data.value[0].morning_work_time,
        //     afternoon_work_time: res.data.data.value[0].afternoon_work_time
        //   })
        // } else {
          
        // }
      }
    })

    

    // 判断是否接单
    wx.request({
      url: 'https://www.nx.tt/addon/collection/api/shop?act=' + 'wait_order',
      data:{
        uaid: globalData.uaid,
        udid: globalData.udid,
        mpid: globalData.mpid,
        openid: globalData.openid,
        shop_id: wx.getStorageSync("shopId")
      },
      // method: 'POST',
      success:function(res){
        if(res.data.code == 1){
          wx.setStorageSync("orderId", res.data.data.id)
          wx.setStorageSync("shopIdss", res.data.data.shop_id)
          wx.setStorageSync("driverlat", res.data.data.lat)
          wx.setStorageSync("driverlng", res.data.data.lng)
          
          console.log(res.data.data,'resresdddddd')
          if (res.data.data.status == 0) {
            timing(that);
            charging(that);
            that.setData({
              locationIf: false,
              callIf: false,
              timeIf: true,
              barrel: res.data.data.number,
              btnvalue: '取消呼叫'
            })
          
          } else if (res.data.data.status == 1) {
            that.setData({
              call_text: "已接单",
              locationIf: true,
              callIf: false,
              timeIf: false,
              donghua: false,
              btnvalue: '司机位置',
              barrel: res.data.data.number
            })
            wx.setStorageSync("license", res.data.data.license)
          } else if (res.data.data.status == 2) {
            that.setData({
              callIf: true,
              timeIf: false,
              worktime: false,
              locationIf: false
            })
            // wx.setStorageSync("driverPhones", res.data.data.driver.phone)
            // wx.setStorageSync("driverNames", res.data.data.driver.name)
          } 
        } else if(res.data.code == 0){
          that.setData({
            callIf: true,
            timeIf: false,
            worktime: false,
            locationIf: false
          })
        }
        
      }
    })
  },

  send: function () {
    var that = this;
    var openid = wx.getStorageSync("openid");
    wx.setStorageSync("tongnum", that.data.barrel);
    wx.setStorageSync("ShopId", that.data.shopIds)
    if (wx.getStorageSync("clientIds") == ""){
      wx.showToast({
        title: '呼叫失败',
        icon: 'none'
      })
    } else {
      wx.request({
        url: 'https://www.nx.tt/addon/collection/api/shop',
        data: {
          uaid: wx.getExtConfigSync().uaid,
          udid: wx.getExtConfigSync().udid,
          act: "order",
          mpid: wx.getExtConfigSync().mpid,
          number: that.data.barrel,
          shop_id: that.data.shopIds,
          shop_name: that.data.shopNames,
          openid: openid,
          phone: that.data.shopPhones,
          client_id: wx.getStorageSync("clientIds")
        },
        method: 'POST',
        success: function (res) {
          if (res.data.code == 1) {
            wx.setStorageSync("orderIds", res.data.socket.id)
            wx.showToast({
              title: '呼叫成功，等候司机接单',
              icon: 'none'
            })
            that.setData({
              callIf: false,
              timeIf: true
            })
            console.log(that.data.timeIf, 'kkkkkkkk')
            if (that.data.timeIf == true) {
              timing(that);
              charging(that);
            }
          } else if (res.data.code == 0) {
            wx.showToast({
              title: '呼叫失败',
              icon: 'none'
            })
          }
          console.log(res, '下单的res')
        }
      })
    }
  },

  // 取消呼叫
  cancelCall: function () {
    var that = this;
    if (that.data.btnvalue == "取消呼叫"){
      wx.request({
        url: 'https://www.nx.tt/addon/collection/api/shop?act=' + 'cancel_order',
        data: {
          order_id: wx.getStorageSync("orderId") ? wx.getStorageSync("orderId") : wx.getStorageSync("orderIds"),
          shop_id: wx.getStorageSync("shopId"),
          uaid: wx.getExtConfigSync().uaid,
          udid: wx.getExtConfigSync().udid,
          mpid: wx.getExtConfigSync().mpid,
        },
        method: 'POST',
        success: function (res) {
          if (res.data.code == 1) {
            clearInterval(that.data.timer);
            that.setData({
              callIf: true,
              timeIf: false,
              barrel: 1
            })
            if(that.data.timeIf == false){
              clearTimeout(that.data.timers)
              that.setData({
                seconds: 0,
                time: "00:00"
              })
            }
          } else if (res.data.code == 0) {
            wx.showToast({
              title: '订单取消失败',
              icon: 'none'
            })
          }
          console.log(res, "取消呼叫的res")
        }
      })
    } else if (that.data.btnvalue == "司机位置"){
      wx.navigateTo({
        url: '../map_orders/map_orders',
      })
    }
  },

  onShow: function () {
    const that = this;
    var openid = (wx.getStorageSync('openid'))
    var area_id = (wx.getStorageSync('area_id'));
  },
})
