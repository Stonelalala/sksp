// components/home/index.js
// Page({
//   data: {
//     homeActive:false,
//     bottom:'220'
//   },
//   /**
//    * 生命周期函数--监听页面加载
//    */
//   onLoad: function (options) {

//   },
//   setTouchMove: function (e) {
//     var that = this;
//     if (e.touches[0].clientY < 545 && e.touches[0].clientY > 66) {
//       that.setData({
//         top: e.touches[0].clientY
//       })
//     }
//   },
//   open:function(){
//      this.setData({
//        homeActive: !this.data.homeActive
//      })
//   },
// })

var app = getApp();
Component({
  properties: {
    bottom: {
      type: String,
      value: '',
    },
    toTop: {
      type: String,
      value: '',
    }
  },
  data: {
    homeActive: false
  },
  ready: function () {

  },
  attached: function () {

  },
  methods: {
    goTop: function () {
      wx.pageScrollTo({
        scrollTop: 0,
        duration: 800
      })
    },
    setTouchMove: function (e) {
      var that = this;
      if (e.touches[0].clientY < 545 && e.touches[0].clientY > 66) {
        that.setData({
          top: e.touches[0].clientY
        })
      }
    },
    open: function () {
      this.setData({
        homeActive: !this.data.homeActive
      })
    },
  }
})