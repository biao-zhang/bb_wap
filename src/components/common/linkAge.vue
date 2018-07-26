<template>
  <div class="linkAge" v-transfer-dom>
      <popup v-model="show_one" height="9.2rem" position="bottom" >
        <div class="header">
          <span class="tit">选择地区</span><img src="./img/close.png" @click="closePopup" class="headerClose"/>
        </div>
        <div class="con">
          <div class="navBox">
            <ul>
              <li v-for="(item,index) in selected" v-bind:class="{'cur':navIndex==index}" @click="changeNavIndex(index)"><span>{{item.regionName}}</span></li>
            </ul>
          </div>
          <div class="contentBox">
            <div class="content">
              <div class="item" v-for="(item,index) in city0" @click="select(item)"><span>{{item.regionName}}</span></div>
            </div>
          </div>
        </div>
      </popup>
  </div>
</template>
<script>
  import {TransferDom,Popup} from 'vux'

  export default {
    data(){
      return{
        show_one: false,

        navIndex:0,//cur的index
        conIndex:-1,//cur的index
        cityData:[],//返回的城市信息
        selected:[
          {
            "regionId":0,
            "regionName":'请选择'
          }
        ],//所选中的城市信息
        city0:[],//显示的城市列表
        curClickCity:{}     //最近点击的城市
      }
    },
    directives: {TransferDom},
    components:{Popup},
    created(){
      this.req(0)
    },
    mounted(){
      var that = this;
      setTimeout(function () {
        that.show_one=true;
      },1000)
    },
    methods: {
      closePopup(){
        this.show_one=false;
      },
      req(regionId){//  请求数据
        this.axios.post('/api/region/get_address_list',this.qs.stringify({token:"04f8ca66f98577a9ddb3a9514ae43980",pid:regionId}))//获取city0信息
          .then(function (response) {
            this.cityData = response.data;
            if(this.cityData.data.length<=0){//输出结果
//              this.isShow = this.changeLinkageIsShow();
              this.selected.splice(this.selected.length-1,1);
              console.log(this.selected)
//              console.log(this.changeLinkageIsShow())
            }else{
              console.log(this.cityData);
              this.city0 = this.cityData.data;
            }
          }.bind(this))
          .catch(function (error) {
            this.$store.state.toastText='error'
            this.$store.state.toastType='text'
          })
      },
      changeNavIndex(index){//      切换选项卡0-n
        var d = {"regionId":0,"regionName":'请选择'};
        this.navIndex = index;
        this.selected.splice(index-0,this.selected.length-index);
        this.selected.push(d);
        this.req(this.selected[(index-1)>0?index-1:0].regionId);
      },
      select(item){//  选择城市
        this.curClickCity=item;
        this.selected.splice(this.navIndex,0,item);
        this.navIndex++;
        this.req(item.regionId)
      }
    }
  }



</script>
<style scoped>
  .linkAge{width:100%;}

  .header{width:100%;height: 1rem;line-height: 1rem;font-size: 0.34rem;color:#3c3c3c;background-color: white;border-bottom:1px solid #ccc;box-sizing: border-box;}
  .header .tit{width:80%;display: block;margin:auto;text-align: center;}
  .header .headerClose{position:absolute;width:0.3rem;height: 0.3rem;top:0.35rem;right: 0.2rem;}

  .con{width:100%;height: 8.2rem;background-color: white;}

  .navBox{margin:0 0.2rem;height: 1rem;font-size: 0.3rem;color:#3c3c3c;line-height: 1rem;box-sizing: border-box;border-bottom: 1px solid #eee;}
  .navBox ul{width:100%;height: 100%;}
  .navBox ul li{display: inline-block;height:100%;box-sizing:border-box;padding:0 0.2rem;}
  .navBox ul li.cur{color:#f86e0e;border-bottom: 0.04rem solid #f86e0e;}

  .contentBox{margin:0 0.2rem;height:7.2rem;line-height: 1rem;font-size: 0.3rem;color:#3c3c3c;overflow: scroll;}
  .content .item.curCity{color:#f86e0e;}
</style>
