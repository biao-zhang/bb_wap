<template>
  <div class='shopAdd'>
    <div class="left">
      <img src="../../img/gouwu1.png" alt="">
      <div class="left_right">
        <p v-if="datas.description === '0'">管理员</p>
        <p v-if="datas.description === '1'">商品抵扣</p>
        <p v-if="datas.description === '2'">抵扣退还</p>
        <p v-if="datas.description === '3'">服务抵扣</p>
        <p v-if="datas.description === '4'">余额转换</p>
        <p v-if="datas.description === '5'">会员消费返积分</p>
        <p>{{createTime[0]}}-{{createTime[1]}}-{{createTime[2]}} {{createTime[3]}}:{{createTime[4]}}:{{createTime[5]}}</p>
      </div>
    </div>
    <div class="right">{{ addAndReduce > 0 ? '+' + addAndReduce : addAndReduce  }}</div>
  </div>
</template>
<script>
  /**
   * @props
   * @emit
   */

  import { time } from "../../../../untils/untils";

  export default {
    data(){
      return{

      }
    },
    computed: {
      // 时间
      createTime() {
        return time(this.datas.changeTime)
      },
      // 收入/支出
      addAndReduce() {
        return this.datas.intergral * this.datas.operateType
      }
    },
    props:{
      datas:{
        type:Object,
        default:{}
      }
    },
    mounted(){

    },
    methods:{

    },
  }
</script>
<style scoped>
    .shopAdd{padding:0.3rem 0;display:flex;justify-content:space-between;border-bottom:1px solid #ededed;background:#fff;}

    .left{display:flex;flex:1;}
    .left img{width:0.8rem;height:0.8rem;}

    .left_right p{line-height:0.4rem;margin-left:0.2rem;}
    .left_right p:first-child{font-size:0.3rem;color:#333333;}
    .left_right p:last-child{font-size:0.24rem;color:#999999;}

    .right{line-height:0.8rem; font-size:0.34rem; color:#f86e0e;}
</style>
