<template>
  <div class='awardRanking'>
    <x-header class="xheader"  :left-options="{backText:''}" :title="msg" :right-options="{showMore:false}" style="position:fixed;z-index:10;">
      <a slot="right" ><router-link to="/y/awardExplain" class="titleRight">说明</router-link></a>
    </x-header>


    <div style="position:fixed;top:46px;left:0;right:0;z-index:10;" ref="ten">
      <div class="information_1">
        <div class="one_1">
          <p>当前排名：</p>
          <p>{{info.ranking}}</p>
        </div>
        <div class="two_1">
          <p>正在奖励：</p>
          <p>{{giveMoney}}/{{nowMoney}}元</p>
        </div>
        <div class="three_1">
          <p>累计奖励：</p>
          <p>{{gave}}/{{all}}元(第{{info.nowNum}}/{{info.allNum}}个订单)</p>
        </div>
      </div>
      <!--名次-->
      <div class="ranking">前十名</div>
    </div>

    <div class="nice" :style="{height:listH+'px'}">
      <div class="list" v-if="list != ''" v-for="(item,index) in list" :key="index">
        <div class="list_one">
          <img v-if="index != 0 ? one_1 : true" src="./img/one.png" alt="">
          <img v-if="index != 1 ? two_1 : true" src="./img/two.png" alt="">
          <img v-if="index != 2 ? three_1 : true" src="./img/three.png" alt="">
          <award-list :datas="item"></award-list>
        </div>
      </div>
    </div>
    <div v-if="list == ''" class="null" style="position:fixed;top:3.5rem;left:0;right:0;">
      <img class="null_img" src="./img/null.png" alt="">
      <p>暂时没有排名哦~</p>
    </div>
  </div>
</template>
<script>
  /**
   * @props
   * @emit
   */
  import {XHeader} from 'vux'
  import { awardParticulars } from "@/api/personally"
  import awardList from '@/components/my/accountBook/awardList'
  export default{
    components:{
      XHeader,
      awardList
    },
    data(){
      return{
        msg:"奖励排名",
        state:true,
        one_1:false,
        two_1:false,
        three_1:false,
        index:'',
        info:{},
        list:[],
        giveMoney:'', //正在奖励金额1
        nowMoney:'',  //正在奖励金额2
        gave:''  ,    //累计奖励1
        all:'',       //累计奖励2
        listH: 0,
      }
    },
    props:{

    },
    mounted(){

      //获取头部高度
      setTimeout(() => {
        console.log(window.innerHeight)
        this.listH = window.innerHeight - (46 + this.$refs.ten.clientHeight)
      }, 20)

      if(this.index = 0){
        this.one_1 = true
      }
      awardParticulars().then(res => {
        console.log('奖励明细',res)
        if(res.message = 'success'){
          this.info = res.data.info
          this.list = res.data.list

          this.giveMoney = Number(this.info.giveMoney).toFixed(2)
          this.nowMoney = Number(this.info.nowMoney).toFixed(2)
          this.gave = Number(this.info.gave).toFixed(2)
          this.all = Number(this.info.all).toFixed(2)

        }
      })
    },
    methods:{

    },
  }
</script>
<style scoped>
  .xheader{width:100%;background-color: white;}
  .awardRanking{height:100%;background:#fff;}
  .awardRanking >>> .vux-header .vux-header-title{font-size: 0.36rem;color:#111;}
  .awardRanking >>> .vux-header .vux-header-left .left-arrow:before{border-color:#111;}
  .vux-header .vux-header-right a .titleRight{font-size: 0.28rem;color:#f86e0e}
  .information_1{width:100%;height:1.84rem;background:url("./img/bg33.png") no-repeat;background-size:100% 100%;padding:0 0.2rem;box-sizing:border-box;}
  .one_1,.two_1,.three_1{display:flex;line-height:0.6rem;}
  .information_1 p{font-size:0.28rem;color:#333333;}
  .information_1 p:first-child{width:1.5rem;}
  .information_1 p:last-child{flex:1;}
  .ranking{line-height:0.72rem;background:#f5f5f5;padding:0 0.2rem; box-sizing:border-box;font-size:0.28rem;color:#333333;}
  /*列表*/
  .list{width:100%;padding:0 0.2rem;box-sizing:border-box;display:flex;}
  .list_one{width:100%;border-bottom:1px solid #ededed;box-sizing:border-box;padding:0.12rem 0;}


  .name_1{display:flex;justify-content:space-between;line-height:0.5rem;margin-left:0.6rem;}
  .name_1 div{display:flex;}
  .name_1 div p{font-size:0.3rem;color:#333;}

  .time_1{display:flex;justify-content:space-between;line-height:0.5rem;margin-left:0.6rem;}
  .time_1 div{display:flex;}
  .time_1 div p{font-size:0.28rem;color:#666;}

  .list_one img{width:0.5rem;height:0.5rem;position:absolute;}
  .null{text-align:center;margin-top:0.95rem;}
  .null .null_img{width:4.6rem;height:3.8rem;}
  .null p {font-size:0.32rem;color:#333;line-height:1rem;}

  .nice{overflow: scroll;position:fixed;top:3.5rem;left:0;right:0;}
</style>
