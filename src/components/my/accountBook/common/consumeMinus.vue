<template>
  <div class='consumeMinus'>
    <div class="left">
      <img src="../../img/xiaofei1.png" alt="">
      <div class="left_right">
        <p>消费</p>
        <p>08-17 16:12</p>
      </div>
    </div>
    <div class="right">-500</div>
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
    props:{

    },
    mounted(){

    },
    methods:{

    },
  }
</script>
<style scoped>
  .consumeMinus{padding:0.3rem 0;display:flex;justify-content:space-between;border-bottom:1px solid #ededed;background:#fff;}

  .left{display:flex;flex:1;}
  .left img{width:0.8rem;height:0.8rem;}

  .left_right p{line-height:0.4rem;margin-left:0.2rem;}
  .left_right p:first-child{font-size:0.3rem;color:#333333;}
  .left_right p:last-child{font-size:0.24rem;color:#999999;}

  .right{line-height:0.8rem; font-size:0.34rem; color:#666666;}
</style>
