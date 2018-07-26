<template>
  <div>
    <div class="cr_content">
      <img src="../../shop/img/myorder.png" />
      <div class="cr_success">
        <div>还没有相关订单</div>
        <div>去看看有哪些想买的~</div>
      </div>
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
    text-align:center;
    margin-top:1.5rem;
  }
  .cr_content img {
    width: 3.58rem;
  }
  .cr_success {
    padding: 0.51rem 0 0.86rem 0;
    text-align: center;
    font-size: 0.30rem;
    color: #666;
  }

</style>
