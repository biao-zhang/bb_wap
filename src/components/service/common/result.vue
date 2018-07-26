<template>
  <div>
    <div class="top">
      <x-header :left-options="{backText: ''}">{{msg}}</x-header>
    </div>
    <div class="result-img">
      <img src="../img/result.png"/>
    </div>
    <div class="result-text">
      <div>已经报名成功了哟</div>
      <div>静待佳音吧</div>
    </div>
    <router-link  :to="{path:'/service/serviceIndex'}">
      <div class="result-service">返回服务</div>
    </router-link>
  </div>

</template>
<script>
  import { XHeader } from 'vux'
  export default {
    components: {XHeader},
    data() {
      return {
        msg: '报名结果'
      }
    }
  }
</script>
<style scoped>
  .vux-header { background: #ffffff;}

  .top >>> .vux-header-title {color: #000;}
  .top >>> .vux-header-left .left-arrow:before {border-color:#000;}

  .result-img {padding: 0.85rem;}
  .result-img img {width: 100%;}
  .result-text {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 0.64rem;
    font-size: 0.3rem;
  }
  .result-service {
    margin: 0.5rem auto;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 4rem;
    height: 0.75rem;
    border: 1px solid #f86e0e;
    border-radius: 2px;
    color: #f86e0e;
    font-size: 0.32rem;
    line-height:0.75rem;
  }
</style>
