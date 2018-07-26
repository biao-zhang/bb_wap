import Vue from 'vue'
import Vuex from "vuex"
import moduleA from "./moduleA"
import moduleB from "./moduleB"
import page from "./page"
import service from "./service/service"
import nearby from "./nearby/nearby"
import my from "./my/my"
import shop from "./shop/shop"
import getStaticData from "./getStaticData"
import address from "./my/address"
import shopGoodsList from "./shop/shopList/shopGoodsList"
import seckill from "./shop/seckill/seckill"
import goodsDetail from "./shop/goodsDetail/goodsDetail"  //商品详情

import cartOrder from './orders/cartOrder'
import o2oCartOrder from './orders/o2oCartOrder'
import nowBuyOrder from './orders/nowBuyOrder'
import o2oNowBuyOrder from './orders/o2oNowBuyOrder'
import cart from './cart/cart'

import eightClassify from './shop/eightClassify/eightClassify'   //第八个分类

import bindThirdly from './my/bindThirdly/bindThirdly'   //绑定第三方

Vue.use(Vuex)

export default new Vuex.Store({
  modules:{
    a:moduleA,
    b:moduleB,
    page:page,
    service:service,
    nearby:nearby,
    my:my,
    shop:shop,
    getStaticData:getStaticData,
    address:address,
    shopGoodsList: shopGoodsList,
    seckill: seckill,
    goodsDetail:goodsDetail,   //商品详情
    nowBuyOrder:nowBuyOrder,   //立即支付结算
    o2oNowBuyOrder:o2oNowBuyOrder,   //立即支付结算
    cartOrder:cartOrder,        //购物车结算
    o2oCartOrder:o2oCartOrder,        //购物车结算
    cart:cart,                  //购物车
    eightClassify:eightClassify,  //第八个分类
    bindThirdly:bindThirdly    //绑定第三方
  },
  state:{
    hostId:'a4ec62fab11f4ab88b37a021cdc49e7f',//用户id
    hostToken:'a6d77d5ab91a4cba650f328a52f2f373',
    loading:false,
    loadingText:'加载中...',
    toastText:'错误le',
    toastType:'warn',   // success, warn, cancel, text
    toastState:false,
    adcode:'',
    bottomIndex:1,     //默认显示商城
    fontSize:0,
    isLoading: false, //vux loadding
    userId:'',
  },
  getters:{
    changeLinkageIsShow: state => {
      // return state.linkageIsShow;
    }
  },
  mutations:{
    updateLoadingStatus (state, payload) {
      state.isLoading = payload.isLoading
    },
    setFontSize(state,params){
      state.fontSize = params;
    },
    setLoading(state,params){
      state.loading = params;
    },
    setLoadingText(state,params){
      state.loadingText = params;
    },
    setUserId(state,params)
    {
      state.userId = params;
    },
    setAdcode(state,params){
      state.adcode = params;
    },
    setToastText(state,params){
      state.toastText = params;
    },
    setToastType(state,params){
      state.toastType = params;
    },
    changeToastState(state,params){
      state.toastState=params;
    },
    bottomChangeState(){
      console.log("bottomChangeState")
    },
    getSelected(state,selected) {
      // state.linkageSelected = selected;
    },
    getBottomIndex(state,params){
      state.bottomIndex = params;
    }
  },
  actions:{

  }
});

// rootState.toastText='lml';
// rootState.toastType='warn';     // success, warn, cancel, text
