<template>
  <div class='packetList'>
    <div class="left">
      <img src="../../img/rwhb.png" alt="">
      <div class="left_right">
        <p class="p1">{{datas.red_attribute==0?'平均包':'随机包'}}</p>
        <p class="p2">{{createTime.getFullYear()}}-{{createTime.getMonth()+1}}-{{createTime.getDate()}} {{createTime.getHours()}}:{{createTime.getMinutes()}}:{{createTime.getSeconds()}}</p>
      </div>
    </div>
    <div class="right">￥{{datas.price}}</div>
  </div>
</template>
<script>
  /**
   * @props
   * @emit
   */

  export default{
    data(){
      return{

      }
    },
    computed:{
      createTime(){
        return new Date(this.datas.create_time)
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
  .packetList{padding:0.3rem 0;display:flex;justify-content:space-between;border-bottom:1px solid #ededed;background:#fff;}

  .left{display:flex;flex:1;}
  .left img{width:0.8rem;height:0.8rem;}

  .left_right p{line-height:0.4rem;margin-left:0.2rem;}
  .left_right .p1{font-size:0.3rem;color:#333333;}
  .left_right .p2{font-size:0.24rem;color:#999999;}

  .right{line-height:0.8rem; font-size:0.34rem; color:#333333;}
</style>
