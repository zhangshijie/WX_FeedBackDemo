//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    tempFilePaths:'',
    resultText:'初始状态'
  },
  //事件处理函数

  takePhoto: function(){
      let self=this;
      wx.chooseImage({
        count: 1,
        sizeType: ['original', 'compressed'], 
        sourceType: ['album', 'camera'], 
        success: function (res) {
            self.setData({ 
                tempFilePaths:res.tempFilePaths[0] 
            });
            self.sendPhoto(res.tempFilePaths);
        }
    });
  },


  sendPhoto:function(path){
        let self=this;
        wx.uploadFile({
            url: '192.168.1.100:3000',
            filePath: path,
            name:"file",
            formData:{
                "user":"test"
            },
            success:function(res){
                self.setData({
                    resultText:"上传成功"
                });
            },
            fail:function(res){
                self.setData({
                    resultText:"上传失败"
                });
            }
        });
  },


  onLoad: function () {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })
  }
})
