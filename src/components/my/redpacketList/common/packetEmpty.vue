<template>
  <div class='packetEmpty'>
    <P>今年还没有发过红包</P>
    <router-link to="/z/giveBonus"><div class="btn">发送红包</div></router-link>
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
  .packetEmpty{text-align:center;margin-top:2.1rem;}
  .packetEmpty p{line-height:0.9rem;font-size:0.3rem;color: #999999;}
  .btn{margin:0 auto;width:4rem;height:0.8rem;text-align:center;line-height:0.8rem;color:#f86e0e;font-size:0.32rem;border:0.02rem solid #f86e0e;border-radius:0.4rem;}
</style>
