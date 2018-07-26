const personalData = {
  namespaced:true,
  state: {
    msg:{
      headPortrait:['http://dhtest2.oss-cn-beijing.aliyuncs.com/web/yxYke84dhyWf567937418hbRpHiw27re.png'],
      nickName:'nickName',
      trueName:'真实姓名',
      phone:'15454254521',
      sex:1,
      address:{
        value:[],
        name:['河南省','郑州市','二七区']
      },
      signature:'signaturesignaturellllll'
    },
    realNameAuthentication:{

    }
  },
  mutations: {
    setMsg(state, data) {
      state.msg[data[0]]=data[1]
    }
  },
  actions: {
    changePersonalData({commit},data){
      commit('setMsg',['headPortrait',''])
      commit('setMsg',['nickName',data.nickName])
      commit('setMsg',['trueName',data.trueName])
      commit('setMsg',['phone',data.phone])
      commit('setMsg',['sex',data.sex])
      commit('setMsg',['address',data.address])
      commit('setMsg',['signature',data.signature])
    }
  }
}

module.exports = personalData;
