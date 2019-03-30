// map_orders.js
var app = getApp();
const globalData = app.globalData;
var coors;
var QQMapWX = require('../../utils/qqmap-wx-jssdk.min.js');
var qqmapsdk;
var lat = wx.getStorageSync("driverlat") ? wx.getStorageSync("driverlat") : wx.getStorageSync("lat")
var lng = wx.getStorageSync("driverlng") ? wx.getStorageSync("driverlng") : wx.getStorageSync("lng");
var shopLat= wx.getStorageSync("shopLat")
var shopLng=wx.getStorageSync("shopLng")
Page({
  data: {
    driver_name:'',
    driver_phone:'',
    plate:'',
    shop_lat:'',
    shop_lnt:'',
    driver_lat:'',
    driver_lnt:'',
    polyline:'',
    distance:'',
    barlle: 1,
    drivername: '',
    driverNames: '',
    driverCar:'',
    // lat: wx.getStorageSync("lat"),
    // lng: wx.getStorageSync("lng"),
    // shopLat: wx.getStorageSync("shopLat"),
    // shopLng: wx.getStorageSync("shopLng"),
    markers: [{
      latitude: lat,
      longitude: lng,
      iconPath: '../../images/add-s.png'
    }, {
        latitude: shopLat,
        longitude: shopLng,
        iconPath: '../../images/add-s.png'
    }],
      
  },
  onLoad: function(options) {
    var that2 = this;
    var lat = wx.getStorageSync("driverlat") ? wx.getStorageSync("driverlat") : wx.getStorageSync("lat")
    var lng = wx.getStorageSync("driverlng") ? wx.getStorageSync("driverlng") : wx.getStorageSync("lng");
    // var latd = wx.getStorageSync("lat")
    // var lngd = wx.getStorageSync("lng");
    var shopLat = wx.getStorageSync("shopLat");
    var shopLng = wx.getStorageSync("shopLng")
    console.log(lat, lng, shopLat, shopLng,'ppppppppp')
    wx.request({
      url: 'https://apis.map.qq.com/ws/direction/v1/driving/?from=' + lat +',' + lng + '&to='+shopLat+','+shopLng+'&output=json&callback=cb&key=' + globalData.tencent_map_key,
      success: function (res) {
        coors = res.data.result.routes[0].polyline
        for (var i = 2; i < coors.length; i++) {
          coors[i] = coors[i - 2] + coors[i] / 1000000
        }
        //划线
        var b = [];
        for (var i = 0; i < coors.length; i = i + 2) {
          b[i / 2] = {
            latitude: coors[i], longitude: coors[i + 1]
          };
        }
        that2.setData({
          polyline: [{
            points: b,
            color: "#00BA20",
            width: 10,
            border:'3px solid #00690E',
            dottedLine: false
          }],
        })
      }
    })
    var mapCtx = wx.createMapContext('myMap')
    var order_id = options.order_id;
    var carnum = wx.getStorageSync("license")
    console.log(lat,lng,shopLat, shopLng,'shopLngnnnnn')
    that2.setData({
      shop_lat: shopLat,
      shop_lnt: shopLng,
      driverNames: wx.getStorageSync("driverName"),
      driverCar: carnum
      // markers: markers
    })
    var opt = {
      //WebService请求地址，from为起点坐标，to为终点坐标，开发key为必填
      url: 'https://apis.map.qq.com/ws/direction/v1/driving/?from=' + lat + ',' + lng + '&to=' + shopLat + ',' + shopLng + '&key=' + globalData.tencent_map_key,
      method: 'GET',
      dataType: 'json',
      //请求成功回调
      success: function (res) {
        console.log(res,'ppppppp')
        var ret = res.data
        if (ret.status != 0) return; //服务异常处理
      }
    };
    wx.request(opt);


    var qqmapsdk = new QQMapWX({
      key: globalData.tencent_map_key // 必填
    });
    qqmapsdk.calculateDistance({
      mode: 'driving',//可选值：'driving'（驾车）、'walking'（步行），不填默认：'walking',可不填
      //from参数不填默认当前地址
      //获取表单提交的经纬度并设置from和to参数（示例为string格式）
      from:
      {
        latitude: lat,
        longitude: lng
      }, //若起点有数据则采用起点坐标，若为空默认当前地址
      to:
        [
          {
            latitude: shopLat,
            longitude: shopLng
          }
        ], //终点坐标
      success: function (res) {//成功后的回调
        console.log(res, 'driving');
        // var res = res.result;
        // var dis = [];
        // var dur = [];
        // for (var i = 0; i < res.elements.length; i++) {
        //   dis.push(res.elements[i].distance); //将返回数据存入dis数组，
        //   dis.push(res.elements[i].distance); //将返回数据存入dur数组，
        // }
        // that.setData({ //设置并更新distance数据
        //   distance: dis,
        //   duration: dur
        // });
      },
      fail: function (error) {
        console.error(error);
      },
      complete: function (res) {
        console.log(res);
      }
    });
  
    that2.setData({
      barlle:wx.getStorageSync("tongnum"),
      drivername: wx.getStorageSync("driverPhone")
    })
    // wx.request({
    //   url: globalData.serverurl + '/order_data.html',
    //   data: {
    //     order_id: order_id,
    //     uaid: globalData.uaid,
    //     ucid: globalData.ucid
    //   },
    //   method: 'POST',
    //   header: {
    //     'content-type': 'application/x-www-form-urlencoded' // 默认值
    //   },
    //   success(res) {
    //     if (res.data.code == '200') {
    //       that.setData({
    //         driver_name: res.data.data.driver_name,
    //         driver_phone: res.data.data.driver_phone,
    //         plate: res.data.data.plate,
    //         shop_lat: res.data.data.shop_lat,
    //         shop_lnt: res.data.data.shop_lnt,
    //         driver_lat: res.data.data.driver_lat,
    //         driver_lnt: res.data.data.driver_lnt
    //       })
    //       var result = res.data.data;
    //       //轨迹
          

    //       //让车动起来
    //       // mapCtx.translateMarker({
    //       //     markerId: result.driver_id,
    //       //     autoRotate: true,
    //       //     duration: 10000,
    //       //     destination: {
    //       //       latitude: result.shop_lat,
    //       //       longitude: result.shop_lnt,
    //       //     },
    //       //     animationEnd() {
    //       //       console.log('animation end')
    //       //     }
    //       //   })
    //       var qqmapsdk = new QQMapWX({
    //         key: globalData.tencent_map_key // 必填
    //       });
    //       qqmapsdk.calculateDistance({
    //         mode: 'driving',//可选值：'driving'（驾车）、'walking'（步行），不填默认：'walking',可不填
    //         //from参数不填默认当前地址
    //         //获取表单提交的经纬度并设置from和to参数（示例为string格式）
    //         from: 
    //         { 
    //           latitude: result.driver_lat,
    //           longitude:result.driver_lnt
    //         }, //若起点有数据则采用起点坐标，若为空默认当前地址
    //         to: 
    //         [
    //           {
    //               latitude: result.shop_lat,
    //               longitude: result.shop_lnt
    //           }
    //         ], //终点坐标
    //         success: function (res) {//成功后的回调
    //           console.log(res,'driving');
    //           var res = res.result;
    //           var dis = [];
    //           var dur = [];
    //           for (var i = 0; i < res.elements.length; i++) {
    //             dis.push(res.elements[i].distance); //将返回数据存入dis数组，
    //             dis.push(res.elements[i].distance); //将返回数据存入dur数组，
    //           }
    //           that.setData({ //设置并更新distance数据
    //             distance: dis,
    //             duration: dur
    //           });
    //         },
    //         fail: function (error) {
    //           console.error(error);
    //         },
    //         complete: function (res) {
    //           console.log(res);
    //         }
    //       });
    //     } else {
    //       wx.showModal({
    //         title: '提示',
    //         content: res.data.msg,
    //         showCancel: false
    //       })
    //     }
    //   }
    // })

  },

  onReady: function() {
    wx.setNavigationBarTitle({
      title: '订单详情',
    })
    
  },
  call_driver:function()
  {
    // console.log(this.data.driver_phone);
    var phones = this.data.driver_phone.toString();
    wx.makePhoneCall({
      phoneNumber: wx.getStorageSync("driverPhone") // 仅为示例，并非真实的电话号码
    })
  }
})