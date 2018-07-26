const axios = require('axios')
const qs = require('qs')

const address = {
  state: {
    // allAddress: [
    //   {
    //     id: 0,
    //     name: '雨过天晴',
    //     tel: '150****1024',
    //     person_address: ['河南省','郑州市','二七区'],
    //     person_details: '航海路与经三路交叉口安安瓜果菜A座1303'
    //   },
    //   {
    //     id: 1,
    //     name: '小明飞天',
    //     tel: '150****1024',
    //     person_address: ['河南省','郑州市','二七区'],
    //     person_details: '航海路与经三路交叉口安安瓜果菜A座1303'
    //   },
    //   {
    //     id: 2,
    //     name: '小张无极',
    //     tel: '150****1024',
    //     person_address: ['河南省','郑州市','二七区'],
    //     person_details: '航海路与经三路交叉口安安瓜果菜A座1303'
    //   },
    // ],
    // 暂存数据
    editorAddress: {},
    allAddressList:[],
    curAddressId:'',
    curAddressData:{}
  },

  mutations: {
    // 传递数据到编辑页面（alladdress -> address -> editorNew）
    editorAddress(state, payload) {
      state.editorAddress = payload
    },
    //改变addressLIst信息
    changeAllAddressList(state,data){
      state.allAddressList=data;
    },
    // 改变curAddressId
    changeCurAddressId(state,data){
      state.curAddressId = data
    },
    // 改变curAddressId
    changeCurAddressData(state,data){
      state.curAddressData = data
    }
  },
  actions: {
    editorAddress({commit},payload) {
      commit('editorAddress',payload)
    },
    // 获取收货地址列表
    getMyAddressList({commit},params){
      axios.post('/personally/userAdress/selectList',qs.stringify({
        pageNum:params.pageNum,        // 第n页
        pageSize:params.pageSize,      // 每个页面显示n条数据
      }))
        .then(function (response) {
          console.log(response.data,'收货地址数据')
          if(response.data.result===1){  //成功
            if(response.data.data===null){
              this.$store.state.toastText='没有收货地址,请添加收货地址'
              this.$store.state.toastType='text'
            }else{
              commit("changeAllAddressList",response.data.data.list);
            }
          }else{}  //失败
        })
        .catch(function (error) {
          commit('setToastText','获取收货地址列表失败')
          console.log("getMyAddressList接口error",error);
        })
    }
  }
}

module.exports = address;
