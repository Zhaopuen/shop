//app.js
App({
  onLaunch: function () {
    console.log(wx.getExtConfigSync());
    let _this = this
    let cfg = _this.globalData
    if (cfg.openid) {

    } else {
      // 登录
      wx.login({
        success: function (res) {
          if (res.code) {
            var url = cfg.host + "/wechat/api/session";
            wx.request({
              url: url,
              data: {
                mpid: cfg.mpid,
                code: res.code,
                uaid: cfg.uaid
              },
              method: 'POST',
              header: {
                'content-type': 'application/x-www-form-urlencoded' // 默认值
              },
              success(res) {
                console.log(res,'第一次的openids')
                // if (res.data.code == 0){
                //   wx.navigateTo({
                //     url: '../authorize/authorize',
                //   })
                // }
                if (res.data.code == 1) {
                  wx.setStorageSync('openid', res.data.data.openid);
                  wx.setStorageSync('session_key', res.data.data.session_key);
                  wx.request({
                    url: 'https://www.nx.tt/addon/collection/api/shop',
                    data: {
                      uaid: cfg.uaid,
                      mpid: cfg.mpid,
                      udid: cfg.udid,
                      openid: res.data.data.openid,
                      // phone: '17695172720',
                      // openid: "o_z4g5aUAPQtLApG_j9mST_wTjTI"
                    },
                    method: 'GET',
                    success(res) {
                      console.log(res, '验证身份的reslogin')
                      if (res.data.code == 1) {
                        if (res.data.data.openid != res.data.data.openid) {
                          wx.navigateTo({
                            url: '../login/login',
                          })
                        }
                        // else if (res.data.data.openid == res.data.data.openid) {
                        //   wx.navigateTo({
                        //     url: '../authorize/authorize',
                        //   })
                        // }
                      }else if (res.data.code == 0) {
                        console.log(res.data.data.openid,'openiddd')
                        wx.navigateTo({
                          url: '../authorize/authorize',
                        })
                      }
                    }
                  })
                } else {
                  console.log(res.data.errmsg);
                }
              }
            })
          } else {
            console.log('登录失败！' + res.errMsg)
          }
        }
      })
    }
    // wx.getSetting({
    //   success(res)
    //   {
    //     if (!res.authSetting['scope.userInfo'])
    //     {
    //       wx.redirectTo({
    //         url: '../authorize/authorize',
    //       })
    //     }
    //   }
    // })
  },
  globalData: {
    mpid: wx.getExtConfigSync().mpid || 8,
    udid: wx.getExtConfigSync().udid || 0,
    uaid: wx.getExtConfigSync().uaid || 2,
    host: wx.getExtConfigSync().host || 'https://www.nx.tt',
    api_url: wx.getExtConfigSync().api_url || 'https://www.nx.tt/addon/collection/api/',
    socket_url: wx.getExtConfigSync().socket_url || 'wss://www.nx.tt/wss',
    tencent_map_key: "YB2BZ-3EQWI-DEVGA-5IUQN-KOATS-XRBNX",
    userinfo: wx.getStorageSync('userinfo') || {},
    openid: wx.getStorageSync('openid'),
    phone: wx.getStorageSync('phone'),
  },
  userinfo(openid, phone, callback) {
    if(!openid || !phone) return;
    let cfg = this.globalData
    wx.request({
      url: cfg.api_url + 'shop',
      data: {
        uaid: cfg.uaid,
        udid: cfg.udid,
        mpid: cfg.mpid,
        phone: cfg.phone,
        openid: cfg.openid,
        client_id: wx.getStorageSync("client_id")
      },
      method: 'GET',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success(res) {
        if (res.data.code == 1) {
          wx.setStorageSync('userinfo', res.data.data)
          cfg.userinfo = res.data.data
          callback(res.data.data)
        }
        if (res.data.code == 0) {
          wx.navigateTo({
            url: '/pages/authorize/authorize',
          })
        }
      }
    })
  },
})