// map.js
var app = getApp();
var QQMapWX = require('../../utils/qqmap-wx-jssdk.min.js');
var qqmapsdk;
Page({
  data: {
    latitude: '',
    longitude: '',
    address:'',
  },
  // 调用腾讯导航
  // launchAppError: function() {
  //   var data = this.data;
  //   var latitude = this.data.latitude;
  //   var longitude = this.data.longitude;
  //   wx.openLocation({
  //     latitude: latitude,
  //     longitude: longitude,
  //   })
  // },
  onLoad: function() {
    var that = this
    // 实例化腾讯地图API核心类
    qqmapsdk = new QQMapWX({
      key: 'C5RBZ-L3XHJ-RNXFA-FKTXT-ZPW3E-MCFTJ' // 必填
    });
    var latitude = this.data.latitude;
    var longitude = this.data.longitude;
    //1、获取当前位置坐标
    wx.getLocation({
      type: 'wgs84',
      success: function(res) {
        console.log(res.latitude + "," + res.longitude);
        //2、根据坐标获取当前位置名称，显示在顶部:腾讯地图逆地址解析
        var locationString = res.latitude + "," + res.longitude;
        wx.request({
          url: 'https://apis.map.qq.com/ws/geocoder/v1/',
          data: {
            "key": "C5RBZ-L3XHJ-RNXFA-FKTXT-ZPW3E-MCFTJ",
            "location": locationString
          },
          method: 'GET',
          success: function (r) {
            that.setData({
              latitude: res.latitude,
              longitude: res.longitude,
              address: r.data.result.address
            })
          }
        });
      }
    })
  },

  onReady: function() {
    wx.setNavigationBarTitle({
      title: '地图导航',
    })
  }
})