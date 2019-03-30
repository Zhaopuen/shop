// pages/approve_in/approve_in.js
const app = getApp();
const globalData = app.globalData;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    business_licence:'',
    agreement:'',
    imgs1: [],
    imgs2: [],
  },

  // 上传图片
  chooseImg1: function(e) {
    var that = this;

    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function(res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths;
        
        upload(that, tempFilePaths)
      }
    });
    // 上传图片
    function upload(page, path) {
     
      wx.showToast({
        icon: "loading",
        title: "正在上传"
      }),
        wx.uploadFile({
        url: globalData.host +'/files/api/upload',
          filePath: path[0],
          name: 'file',
          header: { "Content-Type": "multipart/form-data" },
          success: function (res) {
            
            var success_data = JSON.parse(res.data);
            console.log(success_data.success[0].url);
            //上传成功返回数据
            var imgs1 = that.data.imgs1;
            imgs1.push(success_data.success[0].url);
            that.setData({
              imgs1: imgs1,
              business_licence: success_data.success[0].path
            });

            if (res.statusCode != 200) {
              wx.showModal({
                title: '提示',
                content: '上传失败',
                showCancel: false
              })
              return;
            }
          },
          fail: function (e) {
            console.log(e);
            wx.showModal({
              title: '提示',
              content: '上传失败',
              showCancel: false
            })
          },
          complete: function () {
            wx.hideToast(); //隐藏Toast
          }
        })
    }
  },


  // 上传图片
  chooseImg2: function (e) {
    var that = this;

    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths;

        upload(that, tempFilePaths)
      }
    });
    // 上传图片
    function upload(page, path) {

      wx.showToast({
        icon: "loading",
        title: "正在上传"
      }),
        wx.uploadFile({
        url: globalData.host + '/files/api/upload',
          filePath: path[0],
          name: 'file',
          header: { "Content-Type": "multipart/form-data" },
          success: function (res) {

            var success_data = JSON.parse(res.data);
            console.log(success_data.success[0].url);
            //上传成功返回数据
            var imgs2 = that.data.imgs2;
            imgs2.push(success_data.success[0].url);
            that.setData({
              imgs2: imgs2,
              agreement: success_data.success[0].path
            });

            if (res.statusCode != 200) {
              wx.showModal({
                title: '提示',
                content: '上传失败',
                showCancel: false
              })
              return;
            }
          },
          fail: function (e) {
            console.log(e);
            wx.showModal({
              title: '提示',
              content: '上传失败',
              showCancel: false
            })
          },
          complete: function () {
            wx.hideToast(); //隐藏Toast
          }
        })
    }
  },
  // 删除图片
  deleteImg1: function(e) {
    var imgs1 = this.data.imgs1;
    var index = e.currentTarget.dataset.index;
    imgs1.splice(index, 1);
    this.setData({
      imgs1: imgs1
    });
  },
  deleteImg2: function(e) {
    var imgs2 = this.data.imgs2;
    var index = e.currentTarget.dataset.index;
    imgs2.splice(index, 1);
    this.setData({
      imgs2: imgs2
    });
  },


  onReady: function() {
    
  },
  searchBox: function (e) {
    const that = this;
  
    wx.request({
      url: globalData.serverurl +'/shop_register.html', 
      data: {
         address : e.detail.value.address,
         phone : e.detail.value.phone,
         title : e.detail.value.title,
         business_licence : that.data.business_licence,
         agreement : that.data.agreement,
         uniacid:globalData.uniacid,
         area_id:globalData.area_id
      },
      method :'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success(res) {
        console.log(res.data)
      }
    })
  },

})