const axios = require('axios')
const qs = require('qs')

const myCart = {
  namespaced: true,
  state:{
    // 当前需要结算的商品信息
    curShopsMsg:{
      id:1,
      shopList:[
        {
          id:'1',
          redPicket:[
            {id:'1',name:'name1',state:0},
            {id:'2',name:'name2',state:1},
            {id:'3',name:'name3',state:2},
          ],
          goodsList:[
            {id:'11',name:'name11',num:'111',max:'max11'},
            {id:'12',name:'name12',num:'121',max:'max11'}
          ]
        },
        {
          id:"2",
          redPicket:[
            {id:'1',name:'name1',state:0},
            {id:'2',name:'name2',state:1},
            {id:'3',name:'name3',state:2},
          ],
          goodsList:[
            {id:'11',name:'name11',num:'111',max:'max11'},
            {id:'12',name:'name12',num:'121',max:'max11'}
          ]
        },
      ]
    },
    // 购物车信息
    datas:{},
    cartNum: 0,
  },
  getters:{

  },
  mutations:{
    setCurShopsMsg(state,params){
      state.curShopsMsg = params;
    },
    // 修改总金额
    getTotalMoney(state,num){
      state.datas.totalMoney = num;
      console.log(state.datas.totalMoney)
    },
    // 修改购物车list
    getCartList(state,params){
      state.datas = params
    },
    // 购物车数量
    setCartNum(state,params) {
      state.cartNum = params
    }

  },
  actions:{
    // 购物车列表
    cartList(context){
      axios.post('/personally/b2c_local/cart/allList',qs.stringify({terminalType:'wap'}))
        .then(function (response) {
          let d = response.data.data;
          context.commit('getCartList',d)
        })
        .catch(function (error) {
          context.commit('setToastText','获取购物车列表错误',{root:true})
          context.commit('setToastType','error',{root:true})  // success, warn, cancel, text
        })
    },
    // checked
    checked(context,params){
      axios.post('/personally/b2c_local/cart/checkOrNo',qs.stringify({status:params.isCheck,cartIds:params.cartId,terminalType:'wap'}))
        .then(function (response) {
          let datas = response.data;
          console.log(datas,'checkedSuccess')
          context.dispatch('cartList')
        })
        .catch(function (error) {
          context.commit('setToastText','单选接口错误',{root:true})
          context.commit('setToastType','error',{root:true})  // success, warn, cancel, text
        })
    },
    // allChecked
    allChecked(context,params){
      axios.post('/personally/b2c_local/cart/checkOrNo',qs.stringify({check:params.check,terminalType:'wap'}))
        .then(function (response) {
          let datas = response.data;
          console.log(datas,'allCheckedSuccess')
          context.dispatch('cartList')
        })
        .catch(function (error) {
          context.commit('setToastText','全选接口错误',{root:true})
          context.commit('setToastType','error',{root:true})  // success, warn, cancel, text
        })
    },
    // // 购物车总件数
    // totalNum(context,params){
    //   axios.post('/personally/b2c_local/cart/cartNum',qs.stringify({userId:101516,islogin:1}))
    //     .then(function (response) {
    //       let datas = response.data;
    //       // params.loading.close();
    //     })
    //     .catch(function (error) {
    //       console.log("totalNum接口error");
    //       // params.loading.close()
    //     })
    // },
    // 移出购物车
    delShopCart(context,params){
      let redIds = '';
      for(let i=0;i<params.cartId.length;i++){
        redIds += params.cartId[i]+',';
      }
      redIds =redIds.substring(0,redIds.length-1);
      console.log(redIds)
      axios.post('/personally/b2c_local/cart/delCar',qs.stringify({ cartIds:redIds,terminalType:'wap'}))
        .then(function (response) {
          let datas = response.data;
          console.log(datas,'delShopCartSuccess')
          context.dispatch('cartList')
        })
        .catch(function (error) {
          context.commit('setToastText','删除接口错误',{root:true})
          context.commit('setToastType','error',{root:true})  // success, warn, cancel, text
          // params.loading.close();

        })
    },
    // 清空购物车
    clearNullCart(context){
      axios.post('/personally/b2c_local/cart/clearCart',qs.stringify({terminalType:'wap'}))
        .then(function (response) {
          let datas = response.data;
          console.log(datas)
          console.log("clearNull")
          context.dispatch('cartList')
        })
        .catch(function (error) {
          console.log("clearNullCart接口error");
        })
    },
    //改变商品数量
    addNum(context,params){
      console.log(params)
      axios.post('/personally/b2c_local/cart/numOperate',qs.stringify({cartId:params.cartId,num:params.num}))
        .then(function (response) {
          let datas = response.data;
          console.log(datas,'addNum')
          context.dispatch('cartList')
        })
        .catch(function (error) {
          context.commit('setToastText','数量更改接口错误',{root:true})
          context.commit('setToastType','error',{root:true})  // success, warn, cancel, text
        })
    },
   // 加入购物车
   addToCart(context,params){
     console.log('params加入购物车',params);
    axios.post('/personally/b2c_local/cart/addCar',qs.stringify({goodsId:params[0],productId:params[1].toString(),num:params[2],isZy:params[3],terminalType:'web',shopId:params[4]}))
      .then(function (response) {
        if(response.data.result==1){
          let datas = response.data;
          console.log(datas)
          context.commit('setMessage','成功加入购物车',{root:true})
        }else{
          context.commit('setMessage',response.data.message,{root:true})
        }
      })
      .catch(function (error) {
        console.log("addToCart接口error");
        // params.loading.close()
      })
  },

    //移入收藏
    collectionCart(context,params){
      console.log(params)
      axios.post('/shop/api/goodsCollection/moveIntoCollection',qs.stringify({
        goodsIds:params.goodsIds,             //商品ID字符串以逗号分隔
        shopType:params.shopType,            //平台类型(2、b2c本地；1、合作终端；3、b2b本地；4、b2b全国)
        cartIds:params.cartIds,              //购物车Id
      }))
        .then(function (response) {
          if(response.data.message=='success'){
            context.commit('setToastText','加入购物车成功',{root:true})
            context.commit('setToastType','success',{root:true})  // success, warn, cancel, text
          }else{
            context.commit('setToastText','加入购物车失败',{root:true})
            context.commit('setToastType','warn',{root:true})  // success, warn, cancel, text
          }
          context.dispatch('cartList')
        })
        .catch(function (error) {
          context.commit('setToastText','收藏接口错误',{root:true})
          context.commit('setToastType','warn',{root:true})  // success, warn, cancel, text
        })
    },
    ///////////////////////////////////////OOOO222222OOOOOO////////////////////////

  }
}

module.exports = myCart;
