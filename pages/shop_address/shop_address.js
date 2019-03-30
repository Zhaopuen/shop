// pages/shop_address/shop_address.js
var app = getApp();
const globalData = app.globalData;
var e = getApp(), a = new (require("../../utils/qqmap-wx-jssdk.min.js"))({
  key: globalData.tencent_map_key
});

// const Trequest = require('../../utils/location.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: '',  //获取当前位置
    dAddress:'',   //获取input的值
    lat:'',
    lng:'',
    btnvalue:'提交',
    addressDetail:"",
    location: '点击右侧图标，准确定位您的地图位置'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  getlocationaddress: function(){
    var that = this;
    wx.getSetting({
      success: function success(res) {
        if (res.authSetting['scope.userLocation']) {
          wx.chooseLocation({
            success: function success(res) {
              that.setData({
                // address: res.name,
                lat: res.latitude,
                lng: res.longitude,
                location: '已成功标记位置，点图标可重新定位',
                locationimg: '../../images/addresssuccess.png'
              })
            }
          });
        } else {
          wx.authorize({
            scope: "scope.userLocation",
            success: function success(res) {
              wx.chooseLocation({
                success: function success(resd) {
                  console.log(resd, 'kkkkkk')
                  that.setData({
                    // address: resd.name,
                    lat: resd.latitude,
                    lng: resd.longitude,
                    location: '已成功标记位置，点图标可重新定位',
                    locationimg: '../../images/addresssuccess.png'
                  })
                }
              });
            },
            fail: function fail(res) {
              wx.openSetting();
            }
          });
        }
      }
    });
  },
  onLoad: function (options) {
    this.setData({
      navH: app.globalData.navHeight
    })

    var that = this;
    var openid = wx.getStorageSync("openid");
    wx.request({
      url: globalData.api_url+'join',
      data: {
        uaid: globalData.uaid,
        openid: globalData.openid,
        udid: globalData.udid,
        mpid: globalData.mpid
      },
      method: 'GET',
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success(res) {
        if(res.data.code == 0){
          that.setData({
            address: '',
            addressDetail: '',
            location: '点击右侧图标，准确定位您的地图位置',
            locationimg: '../../images/addressred.png'
          })
        }
        if (res.data.code == 1) {
          if (res.data.data.lat == "" && res.data.data.lng == "") {
            that.setData({
              address: '',
              addressDetail: '',
              location: '点击右侧图标，准确定位您的地图位置',
              locationimg: '../../images/addressred.png'
            })
          }
          if (res.data.data.status == 2 && res.data.data.lat != "" && res.data.data.lng !== ""){
            that.setData({
              location: '已成功标记位置，点图标可重新定位',
              locationimg: '../../images/addresssuccess.png'
            })
          }
          if (res.data.data.status == 2) {
            that.setData({
              address: res.data.data.address,
              addressDetail: res.data.data.house_number,
              // location: '已成功标记位置，点图标可重新定位',
              // locationimg: '../../images/addresssuccess.png'
            })
          } 
          if (res.data.data.status == 1 && res.data.data.lat != "" && res.data.data.lng !== ""){
            that.setData({
              address: res.data.data.address,
              addressDetail: res.data.data.house_number,
              btnvalue: '再次提交',
              location: '已成功标记位置，点图标可重新定位',
              locationimg: '../../images/addresssuccess.png'
            })
          } 
          // if (res.data.data.status == 1) {
          //   that.setData({
          //     address: res.data.data.address,
          //     addressDetail: res.data.data.house_number,
          //     btnvalue: '再次提交',
          //     location: '已成功标记位置，点图标可重新定位',
          //     locationimg: '../../images/addresssuccess.png'
          //   })
          // }
          if (res.data.data.status == 3) {
            that.setData({
              address: res.data.data.address,
              addressDetail: res.data.data.house_number,
              btnvalue: '再次提交',
              location: '已成功标记位置，点图标可重新定位',
              locationimg: '../../images/addresssuccess.png'
            })
          }
        }
      }
    })
  },

  // 获取input的值
  detailAddress: function (e) {
    this.setData({
      address: e.detail.value
    })
  },

  address: function(e){
    this.setData({
      addressDetail: e.detail.value
    })
  },

  // 获取当前位置
  getLocation: function () {
    var e = this;
    wx.chooseLocation({
      success: function (a) {
        var t = {
          latitude: a.latitude,
          longitude: a.longitude
        };
        e.getLocationName(t);
      }
    });
  },
  getLocationName: function (e) {
    console.log(e,'gete')
    var t = this;
    a.reverseGeocoder({
      location: {
        latitude: e.latitude,
        longitude: e.longitude
      },
      success: function (res) {
        console.log(res,'333333')
        t.setData({
          address: res.result.formatted_addresses.recommend,
          lat: res.result.location.lat,
          lng: res.result.location.lng,
        });

      }
    });
  },
  openSet: function () {
    wx.openSetting({
      success: function (e) { }
    });
  },
  bindopensetting: function () {
    var e = this;
    wx.getSetting({
      success: function (a) {
      a.authSetting["scope.userLocation"] || e.data.address ? (e.setData({
          canLocation: !0
        }), e.data.address || wx.getLocation({
          type: "wgs84",
          success: function (a) {
            var t = {
              latitude: a.latitude,
              longitude: a.longitude
            };
            e.getLocationName(t);
          }
        })) : wx.authorize({
          scope: "scope.userLocation",
          success: function () {
            e.setData({
              canLocation: !0
            }), wx.getLocation({
              type: "wgs84",
              success: function (a) {
                var t = {
                  latitude: a.latitude,
                  longitude: a.longitude
                };
                e.getLocationName(t);
              }
            });
          },
          fail: function () {
            e.setData({
              canLocation: !1
            });
          }
        });
      }
    });
  },

  searchBox:function(e){
    var that = this;
    var openid = wx.getStorageSync("openid")
    if (that.data.address == ""){
      wx.showToast({
        title: '请选择地址',
        icon: 'none',
        duration: 1000
      })
    } else if (that.data.addressDetail == ""){
      wx.showToast({
        title: '请填写具体地址',
        icon: 'none',
        duration: 1000
      })
    } else { 
      wx.request({
        url: 'https://www.nx.tt/addon/collection/api/join',
        data: {
          uaid: globalData.uaid,
          address: that.data.address,
          lat: that.data.lat,
          lng: that.data.lng,
          house_number: that.data.addressDetail,
          act: "form",
          mpid: globalData.mpid,
          udid: globalData.udid,
          openid: globalData.openid
        },
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded' // 默认值
        },
        success: function(res) {
          if(res.data.code == 1){
            wx.setStorageSync('shop_address', that.data.address);
            wx.setStorageSync('shop_address_detail', that.data.dAddress);
            wx.setStorageSync('shop_lat', that.data.lat);
            wx.setStorageSync('shop_lng', that.data.lng);
            wx.navigateBack({
              delta: 1
            })
          }
        }
      })
    }

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
    // this.bindopensetting();
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