
const axios = require('axios')
const qs = require('qs')
const eightClassify = {
  namespaced: true,
  state: {
    ClassOneDatas:{
      data:[
        {categoryId:''}
      ]
    },
    ClassTwoDatas:{}
  },
  mutations:{
    ClassOneData(state,data){
      state.ClassOneDatas = data;
    },
    ClassTwoData(state,data){
      state.ClassTwoDatas = data;
    },
  },
  actions: {
    // 获取一级分类
    getClassOne({state,commit,dispatch},params){
      axios.post('/shop/api/category/searchCategoryApiList',qs.stringify(
        {
          levels: 1,
          shopType:2
        }))
        .then((response)=>{
          commit('ClassOneData', response.data)
          dispatch('getClassTwo',{categoryId:state.ClassOneDatas.data[0].categoryId})
        })
        .catch((error)=>{
          console.log("cartOrderDatasError1",error)
        })
    },
    //获取二，三级分类
    getClassTwo({state,commit,dispatch},params){
      axios.post('/shop/api/category/searchCategoryListByCategoryId',qs.stringify(
        {
          categoryId: params.categoryId
        }))
        .then((response)=>{
          commit('ClassTwoData', response.data)
          console.log(response.data)
        })
        .catch((error)=>{
          console.log("cartOrderDatasError1",error)
        })
    },
  }
}

module.exports = eightClassify;

