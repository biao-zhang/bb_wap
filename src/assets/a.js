function axiosAll(){
  let that = this;
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
            that.testall.push(d[i])
            lids.push(d[i].regionId)
          }
        }else{
          console.log("没有下一级")
        }
      })
      .catch((err) => {
        console.log(err);
        console.log("网络错误！")
      });
  }
  that.axios.all([getUserAccount('0',that.ids1)])
    .then(that.axios.spread(function (acct, perms,a,b) {
      let ids1F=[];
      for(let r in that.ids1){
        ids1F.push(getUserAccount(that.ids1[r],that.ids2))
      }
      that.axios.all(ids1F)
        .then(that.axios.spread(function () {
//                that.addressDatas = that.testall;
          let ids2F=[];
          for(let t in that.ids2){
            ids2F.push(getUserAccount(that.ids2[t],that.ids3))
          }
          that.axios.all(ids2F)
            .then(that.axios.spread(function () {
              that.addressDatas = that.testall;
//                    let ids3F=[];
//                    for(let r in that.ids3){
//                      ids3F.push(getUserAccount(that.ids3[r],that.ids4))
//                    }
//                    that.axios.all(ids3F)
//                      .then(that.axios.spread(function () {
//                        console.log(that.ids4)
//                        console.log(that.testall);
//                        that.addressDatas = that.testall;
//                      }))
            }))
        }))
    }));
}
