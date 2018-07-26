<template>
  <div>
    <div class="top">
      <x-header :left-options="{backText: ''}">{{ msg_m }}</x-header>
    </div>
    <div class="cr_content">
      <img src="../../shop/img/readnew.png" />
      <div class="cr_success">
        <div>还没有收货地址</div>
        <div>快去添加一个吧~</div>
      </div>

      <div class="back_person" @click="newAddress">新建地址</div>
    </div>
  </div>
</template>
<script>
  import { XHeader } from 'vux'
  export default {
    components: { XHeader },
    data() {
      return {
        msg_m: '收货地址管理'
      }
    },
    methods: {
      newAddress() {
        console.log('新建地址')
        this.$router.push('/z/addnewaddress')
      }
    }
  }
</script>
<style scoped>
  .vux-header { background-color: #ffffff;}
  .top >>> .vux-header-title {color: #000;}
  .top >>> .vux-header-left .left-arrow:before {border-color:#000;}

  .cr_content {
    height: 7.15rem;
    background-color: #ffffff;
    margin-top: 0.10rem;
    padding: 1.20rem 0.76rem;
  }
  .cr_content img {
    width: 100%;
  }
  .cr_success {
    padding: 0.51rem 0 0.86rem 0;
    text-align: center;
    font-size: 0.30rem;
  }
  .back_person {
    margin: 0 auto;
    width: 4.00rem;
    height: 0.80rem;
    border: 1px solid #f86e0e;
    color: #f86e0e;
    border-radius: 0.40rem;
    text-align: center;
    line-height: 0.80rem;
    font-size: 0.32rem;
    cursor: pointer;
  }
</style>
