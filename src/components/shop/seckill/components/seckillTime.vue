<template>
  <div class='seckillTime'>
    <span class="s1">{{ createTime[3] }}:{{ createTime[4] }} </span>
    <span class="s2" v-if="itemChildren.nowTime > itemChildren.startTime && itemChildren.nowTime < itemChildren.endTime">正在秒杀</span>
    <span class="s2" v-if="itemChildren.nowTime < itemChildren.startTime">即将开始</span>
    <span class="s2" v-if="itemChildren.nowTime > itemChildren.endTime">已结束</span>
  </div>
</template>
<script>
  /**
   * @props
   * @emit
   */
  import { time } from "../../../../untils/untils"

  export default{
    computed: {
      createTime() {
        return time(this.itemChildren.startTime)
      }
    },
    props: ['itemChildren'],
  }
</script>
<style scoped>
  .seckillTime .s1{display:inline-block;font-size: 0.34rem;line-height:0.6rem;text-align: center;width:100%;}
  .seckillTime .s2{display:inline-block;font-size: 0.24rem;text-align: center;line-height:0.2rem;width: 100%;}
  .seckillTime .img1{height: 0.13rem;position: absolute;bottom: -0.13rem;left: 1.12rem;}
</style>
