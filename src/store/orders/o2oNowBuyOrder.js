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
      axios.post('/personally/o2o/order/goodsNowBuy',qs.stringify({
        shopId:params.shopId,
        goodsId:params.goodsId,
        productId:params.productId,
        productNum:params.productNum,
      }))
        .then((response)=>{
          console.log(response,'nowBuyOrderDatas数据')
          if(response.data.result===1){
            commit("setNowBuyOrderDatas",response.data.data)
            commit("setAddId",response.data.data.addId)
            commit("setIntegral",response.data.data.integral)
            commit("setInvoiceTemplateId",response.data.data.invoiceTemplateId)
            commit("setRedIds",[])
            commit('setLoading',false,{root:true})
          }else{
            console.log(response.data.result,'result')
            this.$store.state.toastText=response.data.message
            this.$store.state.toastType='text'
            commit('setLoading',false,{root:true})
          }
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
      console.log(params,12222222)
      let redIds = '';
      for(let i=0;i<params.redId.length;i++){
        redIds += '{shopId:'+params.redId[i].shopId+',redId:'+params.redId[i].redId+'},';
      }
      redIds = '['+redIds.substring(0,redIds.length-1)+']';
      console.log({
        addId:params.addId,        //adcode  1000769660
        integral:params.integral,  //抵扣积分
        invoiceTemplateId:params.invoiceTemplateId,    //发票模板id
        // invoiceTemplateId:'',    //发票模板id
        redId:redIds,         //红包id
        shopId:params.shopId,
        goodsId:params.goodsId,
        productId:params.productId,
        productNum:params.productNum,
        isDsd:params.isDsd,             //方式 : 默认店铺配送 1 上门自取
      })
      axios.post('/personally/o2o/order/goodsNowBuyRecalculation',qs.stringify({
        addId:params.addId,        //adcode  1000769660
        integral:params.integral,  //抵扣积分
        invoiceTemplateId:params.invoiceTemplateId,    //发票模板id
        // invoiceTemplateId:'',    //发票模板id
        redId:redIds,         //红包id
        shopId:params.shopId,
        goodsId:params.goodsId,
        productId:params.productId,
        productNum:params.productNum,
        isDsd:params.isDsd,             //方式 : 默认店铺配送 1 上门自取
      }))
        .then((response)=>{
          console.log(response.data.data,'订单重新估算')
          if(response.data.message=='success'){
            commit("setNowBuyOrderDatas",response.data.data)
            commit("setAddId",response.data.data.addId)
            commit("setIntegral",response.data.data.integral)
            commit("setInvoiceTemplateId",response.data.data.invoiceTemplateId)
            commit('setLoading',false,{root:true})
          }else{
            commit('setLoading',false,{root:true})
            commit('setToastText',response.data.message,{root:true})
            commit('setToastType','warn',{root:true})
          }
        })
        .catch((error)=> {
          console.log(error,"changeNowBuyOrderAddress接口error");
          commit('setLoading',false,{root:true})
          commit('setToastText','服务器错误',{root:true})
          commit('setToastType','warn',{root:true})
        })
    },
  }
}

module.exports = nowBuyOrder;
