<template>
  <div class='bonusDetails'>
    <div class="top">
      <x-header :left-options="{backText: ''}">{{ topMessage }}</x-header>
    </div>
    <div class="bonusDetailsContent">
      <div class="bonusTop">
        <div class="bonusTop1">
          <div>
            <img src="../img/bonus.png"/>
          </div>
          <div style="font-size: 0.40rem">
            <span>￥</span>
            <span>{{datas.price}}</span>
          </div>
        </div>
        <div class="bonusTop2">
          <span>红包类型</span>
          <span>{{datas.red_attribute==0?'普通红包':'手气红包'}}</span>
        </div>
        <div class="bonusTop3">
          <div style="display: flex; justify-content: space-between">
            <span>红包剩余</span>
            <div>
              <span style="margin-right: 0.35rem">{{datas.surplus_price}}/{{datas.price}}<span>元</span></span>
              <span>{{datas.surplus_num}}/{{datas.num}}<span>个</span></span>
            </div>
          </div>
          <div style="color: #bdb8b6; font-size: 0.24rem">红包未领取24小时内退回原账户</div>
        </div>
      </div>
      <div class="bonusFoot">
        <div style="margin: 0.20rem 0 0 0.20rem">领取明细</div>
        <div v-if="datas.list!=null">
          <div class="reDetails" v-for="item in datas.list">
            <span>{{item.username}}<br>{{getTime(datas.get_time)[0]}}-{{getTime(datas.get_time)[1]}}-{{getTime(datas.get_time)[2]}} {{getTime(datas.get_time)[3]}}:{{getTime(datas.get_time)[4]}}:{{getTime(datas.get_time)[5]}}</span>
            <span>￥<span>{{item.get_price}}</span></span>
          </div>
          <div class="reDetails" v-if="datas.list.length<=0">
            没人领取红包
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  /**
   * @props
   * @emit
   */
  import { XHeader } from 'vux'
  import { getRedDetail } from '@/api/promotion'

  export default{
    components: {XHeader},
    data(){
      return{
//        topMessage: '红包金额',
        topMessage: '红包领取记录',
        red_id:'',   //红包ID
        datas:{},
      }
    },
    props:{

    },
    mounted(){
      //获取URL中的参数
      if(this.$route.query.id!=undefined){
        this.red_id = this.$route.query.id;
      }else{
        this.$store.state.toastText='参数缺失'
        this.$store.state.toastType='text'
      }
      //获取红包详情
      this.getInit();
    },
    methods:{
      //获取红包详情
      getInit(){
        getRedDetail({red_id:this.red_id}).then((res)=>{
          console.log(res,"红包详情")
          if(res.message == 'success'){
            this.datas = res.data;
          }else{
            this.$store.commit('setToastText',res.message)
            this.$store.commit('setToastType','warn')
          }
        }).catch((err)=>{
          this.$store.commit('setToastText','获取数据失败')
          this.$store.commit('setToastType','warn')
        })
      },
      //格式化时间
      getTime(t){
        let T = new Date(t)
        return [T.getFullYear(),T.getMonth()+1,T.getDate(),T.getHours(),T.getMinutes(),T.getSeconds()]
      }
    },
  }
</script>
<style scoped>
  .vux-header { background-color: #ffffff;}
  .top >>> .vux-header-title {color: #000;}
  .top >>> .vux-header-left .left-arrow:before {border-color:#000;}

  .bonusDetailsContent {
    padding: 0.30rem 0.20rem;
  }
  .bonusTop {
    font-size: 0.30rem;
    box-shadow: 1px 1px 5px #ccc;
  }
  .bonusTop1,.bonusTop2,.bonusTop3 { background-color: #fff4ed;}
  .bonusTop1 {
    padding: 0.1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .bonusTop1 img {
    width: 0.80rem;
  }
  .bonusTop2 {
    padding: 0.35rem 0.1rem;
    border-bottom: 1px solid #fff;
    border-top: 1px solid #fff;
    display: flex;
    justify-content: space-between
  }
  .bonusTop3 {
    padding: 0.2rem 0.1rem;
  }
  .reDetails {
    padding: 0.20rem 0.40rem;
    display: flex;
    justify-content: space-between;
    font-size: 0.26rem;
    color: #7d7d7d;
  }
</style>
