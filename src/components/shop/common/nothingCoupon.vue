<template>
  <div>
    <div class="cr_content">
      <img src="../img/nored.png" />
      <p>暂时还没有红包哦~</p>
    </div>
  </div>
</template>
<script>
  import { XHeader } from 'vux'
  export default {
    components: { XHeader },
    data() {
      return {
        msg_m: '评价结果'
      }
    }
  }
</script>
<style scoped>
  .vux-header { background-color: #ffffff;}
  .top >>> .vux-header-title {color: #000;}
  .top >>> .vux-header-left .left-arrow:before {border-color:#000;}

  .cr_content {
    margin-top:1rem;
    text-align:center;
  }
  .cr_content img {
    width:4.7rem;
    height:3.06rem;
  }
  .cr_content p{    color: #333;
    font-size: 0.3rem;
    line-height: 0.8rem;}
  .cr_success {
    /*padding: 0.51rem 0 0.86rem 0;*/
    text-align: center;
    font-size: 0.30rem;
    color: #666;
  }

</style>
