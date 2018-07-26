
const axios = require('axios')
const qs = require('qs')
const bindThirdly = {
  namespaced: true,
  state: {
    WeixinDatas:{}
  },
  mutations:{
    Weixin(state,data){
      state.WeixinDatas = data;
    },
  },
  actions: {
    //绑定微信
    getWeixin({state,commit,dispatch},params){
      axios.post('/personally/appLoginContriller/appUnbundle',qs.stringify(
        {
          type:2,
          token:'123456'
        }))
        .then((response)=>{
          commit('Weixin', response.data)
          console.log(response)
        })
        .catch((error)=>{
          console.log("cartOrderDatasError1",error)
        })
    },
  }
}

module.exports = bindThirdly;
