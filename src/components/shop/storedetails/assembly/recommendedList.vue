<template>
  <div class="recommendedList">
      <div class="box"><img class="img1" src="../../img/name.png"/> </div>
      <div class="tit">123</div>
      <div class="price">￥456</div>
  </div>
</template>
<script>

  export default {
    data(){
      return{

      }
    },
    mounted(){

    }

  }



</script>
<style scoped>
  .recommendedList{width:3.5rem;height: 4.8rem;box-shadow: 0 2px 6px #ccc;margin-bottom: 0.3rem;}

  .recommendedList .box{width:3.15rem;height: 3.15rem;margin:0.18rem;}
  .recommendedList .box .img1{width:100%;height: 100%;}
  .recommendedList .tit{font-size: 0.3rem;color:#3c3c3c;text-align: center;line-height: 0.5rem;}
  .recommendedList .price{font-size: 0.3rem;color:#f86e0e;text-align: center}


</style>
