<template>
  <div class="evaluationAdd">
      <!--<p>购买35天后追评</p>-->
    <p>追加评价</p>
    <p>{{ itemChildren.evaluateContent }}</p>
  </div>
</template>
<script>
  export default {
    data(){
      return{

      }
    },
    props: ['itemChildren']
  }
</script>
<style scoped>
    .evaluationAdd p:first-child{
        color:#fd593d;
        font-size:0.24rem;
        margin-bottom:0.2rem;
    }
    .evaluationAdd p:last-child{
      color:#6b6b6b;
      font-size:0.3rem;
      margin-bottom:0.2rem;
    }
</style>
