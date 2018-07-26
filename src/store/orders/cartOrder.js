const axios = require('axios')
const qs = require('qs')

const cartOrder = {
  namespaced: true,
  state:{
    readyRedId:-1,
    cartOrderDatas:{},
    addId:'',
    integral:'',
    invoiceTemplateId:'',
    redIds:[],
    ratio:0,
    shopIsNull:false,
  },
  getters:{

  },
  mutations:{
    setCartOrderDatas(state,data){
      state.cartOrderDatas = data;
    },
    setAddId(state,data){
      state.addId = data;
    },
    setIntegral(state,data){
      state.integral = data;
    },
    setInvoiceTemplateId(state,data){
      state.invoiceTemplateId = data;
    },
    setRedIds(state,data){
      state.redIds = data;
    },
    setRatio(state,params){
      state.ratio = params;
    },
    setShopIsNull(state,data){
      state.shopIsNull = data;
    },
  },
  actions:{
    getCartOrderDatas({commit,rootState }){
      axios.post('/personally/b2c/order/cartOrderPay')
        .then((response)=>{
          console.log(response,'getCartOrderDatas数据')
          if(response.data.result===1){
            commit("setShopIsNull",false)
            commit("setCartOrderDatas",response.data.data)
            commit("setAddId",response.data.data.addId)
            commit("setIntegral",response.data.data.integral)
            commit("setInvoiceTemplateId",response.data.data.invoiceTemplateId)
            commit("setRedIds",[])
            commit('setLoading',false,{root:true})
          }else{
            if(response.data.message=='没有要结算的商品'){
              commit("setShopIsNull",true)
            }
            console.log(response.data.result,'result')
            commit('setLoading',false,{root:true})
          }
        })
        .catch((error)=>{
          console.log("cartOrderDatasError1",error)
          commit('setLoading',false,{root:true})
          commit('setToastText','服务器错误',{root:true})
          commit('setToastType','warn',{root:true})

        })
    },
    changeCartOrderAddress({state,commit,dispatch},params){
      let redIds = '';
      for(let i=0;i<params.redIds.length;i++){
        redIds += '{shopId:'+params.redIds[i].shopId+',redId:'+params.redIds[i].redId+'},';
      }
      redIds = '['+redIds.substring(0,redIds.length-1)+']';
      console.log('changeCartOrderAddress参数',params)
      console.log('aaaaaaa',redIds)
      axios.post('/personally/b2c/order/cartOrderPayRecalculation',qs.stringify({
        addId:params.addId,        //adcode  1000769660
        integral:params.integral,  //抵扣积分
        invoiceTemplateId:params.invoiceTemplateId,    //发票模板id
        redIds:redIds         //红包id
      }))
        .then(function (response) {
          console.log(response,'changeCartOrderAddress数据')
          if(response.data.message=='success'){
            commit('setCartOrderDatas',response.data.data)
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
        .catch(function (error) {
          console.log("changeCartOrderAddress接口error");
          commit('setLoading',false,{root:true})
          commit('setToastText','服务器错误',{root:true})
          commit('setToastType','warn',{root:true})
        })
    },
    integralRatio({state,commit,dispatch}){
      axios.post('/personally/helpCenter/platformDeduction')
        .then(function (response) {
          console.log(response,'积分比例')
          if(response.data.message=='success'){
            commit('setRatio',response.data.data.platformDeduction)
          }else{
            commit('setToastText',response.data.message,{root:true})
            commit('setToastType','warn',{root:true})
          }
        })
        .catch(function (error) {
          console.log("integralRatio接口error");
          commit('setLoading',false,{root:true})
          commit('setToastText','服务器错误',{root:true})
          commit('setToastType','warn',{root:true})
        })
    },
  }
}

module.exports = cartOrder;
