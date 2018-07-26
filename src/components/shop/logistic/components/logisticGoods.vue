<template>
  <div class="goods">
    <!--<div class='imgBox1'><img src="../../img/name.png" class="img1"/> </div>-->
    <div class="imgBox1R">
      <div class="line1">{{ logiName }}</div>
      <div class="line2">快递单号：{{ shipNo }}</div>
      <!--<div class="line3">官方电话：635245154</div>-->
    </div>
  </div>
</template>
<script>
  export default {
    data(){
      return{
        shipNo: '',
        logiName: '',
      }
    },
    mounted() {
      this.shipNo = this.$route.query.shipNo
      this.logiName = this.$route.query.logiName
    }
  }
</script>
<style scoped>

  .goods{width:100%;display: flex;justify-content: space-between;margin-top:0.1rem;background-color: white; padding:0.3rem 0.2rem;box-sizing: border-box; }

  .goods .imgBox1{width:2rem;height: 2rem;}
  .goods .imgBox1 .img1{width:100%;height: 100%;}

  .goods .imgBox1R{width:4.8rem;height: 2rem;}
  .goods .imgBox1R .line1{font-size: 0.34rem;color:#f86e0e;line-height: 0.5rem;height: 1rem;}
  .goods .imgBox1R .line2{font-size: 0.26rem;color:#666;line-height: 0.4rem;}
  .goods .imgBox1R .line3{font-size: 0.26rem;color:#666;line-height: 0.4rem;}

</style>
