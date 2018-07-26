<template>
  <div class='redEnvelope'>
    <div class="left">
      <img src="../../img/rwhb.png" alt="">
      <div class="left_right">
        <p v-if="datas.changeType === 0">其他</p>
        <p v-if="datas.changeType === 1">充值</p>
        <p v-if="datas.changeType === 2">消费</p>
        <p v-if="datas.changeType === 3">提现</p>
        <p v-if="datas.changeType === 4">退款</p>
        <p v-if="datas.changeType === 5">积分换余额</p>
        <p v-if="datas.changeType === 6">余额换积分</p>
        <p v-if="datas.changeType === 7">获得现金红包</p>
        <p v-if="datas.changeType === 8">用户返佣金</p>
        <p v-if="datas.changeType === 9">奖励</p>
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

  export default{
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
        return this.datas.money * this.datas.operateType
      }
    },
    props: ['datas'],
    mounted(){

    },
    methods:{

    },
  }
</script>
<style scoped>
  .redEnvelope{padding:0.3rem 0;display:flex;justify-content:space-between;border-bottom:1px solid #ededed;background:#fff;}

  .left{display:flex;flex:1;}
  .left img{width:0.8rem;height:0.8rem;}

  .left_right p{line-height:0.4rem;margin-left:0.2rem;}
  .left_right p:first-child{font-size:0.3rem;color:#333333;}
  .left_right p:last-child{font-size:0.24rem;color:#999999;}

  .right{line-height:0.8rem; font-size:0.34rem; color:#f86e0e;}
</style>
