<template>
  <div class="floorTit">
    <img class="img1" src="../../assets/img/floorTitLeft.png"><span><slot></slot></span><img class="img2" src="../../assets/img/floorTitRight.png">
  </div>
</template>
<script>
  export default {

    mounted(){

    }
  }
</script>
<style scoped>
  .floorTit{text-align: center;padding:0.3rem 0 0.37rem 0;}
  .floorTit .img1{width:1rem;vertical-align: middle}
  .floorTit .img2{width:1rem;vertical-align: middle}
  .floorTit span{font-size: 0.36rem;color:#3a3a3a;vertical-align: middle;margin:0 0.1rem;}
</style>
