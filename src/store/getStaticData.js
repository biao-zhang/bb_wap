const getStaticData = {
  // namespaced: true,
  state: {
    ////////////////级联///////////////
    jilianDatas:[],
    preJilianDatas:[],
    ids1:[],
    ids2:[],
    ids3:[],
    ids4:[],
    /////////////////

  },
  getters:{

  },
  mutations:{
//      获取级联数据
    axiosAll(state,param){
      let that = param.obj;
      function getUserAccount(id,lids) {
        return that.axios.post("/api/region/get_address_list",that.qs.stringify({token:that.token,pid:id}))
          .then((response) => {
            let d = response.data.data;
            if(d.length>0){
              for(let i in d){
                d[i].name = d[i].regionName;
                d[i].value = d[i].regionId;
                if(id!=='0'){
                  d[i].parent = id;
                }
                state.preJilianDatas.push(d[i])
                lids.push(d[i].regionId)
              }
            }else{
              state.preJilianDatas.push({"name":'--',"value":'xxx',"parent":id})
              console.log("没有下一级")
            }
          })
          .catch((err) => {
            console.log(err);
            console.log("网络错误！")
          });
      }
      that.axios.all([getUserAccount('0',state.ids1)])
        .then(that.axios.spread(function (acct, perms,a,b) {
          let ids1F=[];
          for(let r in state.ids1){
            ids1F.push(getUserAccount(state.ids1[r],state.ids2))
          }
          that.axios.all(ids1F)
            .then(that.axios.spread(function () {
//                state.jilianDatas = state.preJilianDatas;
              let ids2F=[];
              for(let t in state.ids2){
                ids2F.push(getUserAccount(state.ids2[t],state.ids3))
              }
              that.axios.all(ids2F)
                .then(that.axios.spread(function () {
                  state.jilianDatas = state.preJilianDatas;
//                    let ids3F=[];
//                    for(let r in state.ids3){
//                      ids3F.push(getUserAccount(state.ids3[r],state.ids4))
//                    }
//                    that.axios.all(ids3F)
//                      .then(that.axios.spread(function () {
//                        state.jilianDatas = state.preJilianDatas;
//                      }))
                }))
            }))
        }));
    },
  },
  actions:{
    setJilianData(context,obj){

    },
  }
}

module.exports = getStaticData;
