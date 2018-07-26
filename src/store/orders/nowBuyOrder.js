const axios = require('axios')
const qs = require('qs')

const nowBuyOrder = {
  namespaced: true,
  state:{
    addId:'',
    integral:0,
    invoiceTemplateId:null,
    redIds:[],

    nowBuyOrderDatas:{
      shopList:[]
    },
  },
  getters:{

  },
  mutations:{
    setAddId(state,data){
      state.addId = data;
    },
    setIntegral(state,data){
      console.log(data)
      state.integral = data;
    },
    setInvoiceTemplateId(state,data){
      state.invoiceTemplateId = data;
    },
    setRedIds(state,data){
      state.redIds = data;
    },
    setNowBuyOrderDatas(state,data){
      state.nowBuyOrderDatas = data;
    },
  },
  actions:{
    //商品立即购买结算接口
    getNowBuyOrderDatas({commit},params){
      console.log('getNowBuyOrderDatas_params',params)
      axios.post('/personally/b2c/order/goodsNowBuy',qs.stringify({
        goodsId:params.goodsId,
        productId:params.productId,
        productNum:params.productNum,
        activityId:params.activityId,
        isZy:params.isZy,
        shopId:params.shopId,
        activityType:params.activityType,
      }))
        .then((response)=>{
          commit("setNowBuyOrderDatas",response.data.data)
          commit("setAddId",response.data.data.addId)
          commit("setIntegral",response.data.data.integral)
          commit("setInvoiceTemplateId",response.data.data.invoiceTemplateId)
          commit("setRedIds",[])
          console.log(response,'NOWBUY')
          commit('setLoading',false,{root:true})
        })
        .catch((error)=>{
          console.log("nowBuyOrderDatasError1",error)
          commit('setLoading',false,{root:true})
          commit('setToastText','服务器错误',{root:true})
          commit('setToastType','warn',{root:true})
        })
    },
    // 商品立即购买结算接口 重新计算
    changeNowBuyOrderAddress({state,commit,dispatch},params){
      console.log('重新估算参数',params)
      let redIds = '';
      for(let i=0;i<params.redIds.length;i++){
        redIds += '{shopId:'+params.redIds[i].shopId+',redId:'+params.redIds[i].redId+'},';
      }
      redIds = '['+redIds.substring(0,redIds.length-1)+']';
      axios.post('/personally/b2c/order/goodsNowBuyRecalculation',qs.stringify({
        addId:params.addId,        //adcode  1000769660
        integral:params.integral,  //抵扣积分
        invoiceTemplateId:params.invoiceTemplateId,    //发票模板id
        redIds:redIds,         //红包id
        goodsId:params.goodsId,
        productId:params.productId,
        productNum:params.productNum,
        activityId:params.activityId,
        isZy:params.isZy,
        shopId:params.shopId,
        activityType:params.activityType,
      }))
        .then((response)=>{
        console.log(response.data,'重新估算数据')
          if(response.data.message=='success'){
            commit("setNowBuyOrderDatas",response.data.data)
            commit("setAddId",response.data.data.addId)
            commit("setIntegral",response.data.data.integral)
            commit("setInvoiceTemplateId",response.data.data.invoiceTemplateId)
            commit('setLoading',false,{root:true})
          }else{
            commit('setLoading',false,{root:true})
            commit('setToastText','服务器错误',{root:true})
            commit('setToastType','warn',{root:true})
          }
        })
        .catch(function (error) {
          commit('setLoading',false,{root:true})
          console.log("changeNowBuyOrderAddress接口error");
          commit('setToastText','服务器错误',{root:true})
          commit('setToastType','cancel',{root:true})
        })
    },
  }
}

module.exports = nowBuyOrder;
