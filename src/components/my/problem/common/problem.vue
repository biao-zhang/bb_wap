<template>
  <div class='problem'>

      <div class="problem_top">
        <img src="../../img/dian1.png" alt="">
        <p>问题：什么是等级说明？</p>
      </div>
      <p class="daan">答案：在您成为奈斯牛会员，使用奈斯牛提供的服务之前，请您认真阅读本用户协议及隐私政策，更好的部条款。</p>
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
    .problem{background:#fff;margin:0 0.2rem;padding-bottom:0.2rem;border-bottom:1px solid #f5f5f5;}


    .problem_top{display: -webkit-box !important;width:100%;height:0.4rem;font-size:0.32rem;color: #333333;padding:0.4rem 0 0.2rem 0;}
    .problem_top img{width:0.15rem;height:0.15rem;justify-content: center;align-items: center;}
    .problem_top p{flex:1;line-height:0.4rem;margin-left:0.1rem;}

    .daan{padding-left:0.2rem;line-height:0.5rem;font-size:0.28rem;color: #333333;}
</style>
