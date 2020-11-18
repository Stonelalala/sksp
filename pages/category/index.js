import { getCategoryList} from '../../api/store.js';
const app = getApp()
Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    Custom: app.globalData.Custom,
    TabCur: 0,
    MainCur: 0,
    VerticalNavTop: 0,
    list: [],
    load: true,
    swiperList:[
      'http://wechat.stonemei.com/f4b8f202009091636305603.jpg',
      'http://wechat.stonemei.com/55597202009091640438869.jpg',
      'http://wechat.stonemei.com/3cc9c202009091630313562.jpg'
    ]
  },
  onLoad() {
    wx.showLoading({
      title: '加载中...',
      mask: true
    });
    this.getAllCategory();
    let list = [{}];
    for (let i = 0; i < 26; i++) {
      list[i] = {};
      list[i].name = String.fromCharCode(65 + i);
      list[i].id = i;
    }
    this.setData({
      list: list,
      listCur: list[0]
    })
  },
  onReady() {
    wx.hideLoading()
  },
  getAllCategory:function(){
    var that = this;
    getCategoryList().then(res=>{
      that.setData({
        productList: res.data
      });
    });
   
  },
  toList:function(e){
    let id = e.currentTarget.dataset.id;
    let title = e.currentTarget.dataset.title;
    wx.navigateTo({
      url:   '/pages/goods_list/goods_list?sid='+id+'&title='+title,
    });
  },
  tabSelect(e) {
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      MainCur: e.currentTarget.dataset.id,
      VerticalNavTop: (e.currentTarget.dataset.id - 1) * 50
    })
  },
  VerticalMain(e) {
    let that = this;
    let list = this.data.list;
    let tabHeight = 0;
    if (this.data.load) {
      for (let i = 0; i < list.length; i++) {
        let view = wx.createSelectorQuery().select("#main-" + list[i].id);
        view.fields({
          size: true
        }, data => {
          list[i].top = tabHeight;
          tabHeight = tabHeight + data.height;
          list[i].bottom = tabHeight;     
        }).exec();
      }
      that.setData({
        load: false,
        list: list
      })
    }
    let scrollTop = e.detail.scrollTop + 20;
    for (let i = 0; i < list.length; i++) {
      if (scrollTop > list[i].top && scrollTop < list[i].bottom) {
        that.setData({
          VerticalNavTop: (list[i].id - 1) * 50,
          TabCur: list[i].id
        })
        return false
      }
    }
  }
})