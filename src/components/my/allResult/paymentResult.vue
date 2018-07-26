<template>
  <div>
    <div class="top">
      <x-header :left-options="{backText: ''}">{{ parantDict[test].title }}</x-header>
    </div>
    <div class="cr_content">
      <img :src="parantDict[test].img" />
      <div class="cr_success" v-if="test !== 'openBonus'">{{ parantDict[test].info }}</div>
      <div class="cr_success" v-if="test === 'openBonus'">
        <div>毛衣专卖店</div>
        <div style="font-size: 0.48rem; color: #db001b; margin: 0.10rem"><span>10.00</span><span>元</span></div>
        <div style="color: #999999">可用于此店铺内消费</div>
      </div>
      <div class="back_person" @click="back_person">{{ parantDict[test].backBtn }}</div>
    </div>
  </div>
</template>
<script>
  import { XHeader } from 'vux'
  export default {
    components: {XHeader},
    data() {
      return {
        msg_m: '',
        test: 'paySucess',
        orderId: '',
        parantDict: {                                   // 大对象
          'openBonus': {
            title: '拆红包',
            img: require('../img/juxing.png'),
            info: '',
            backBtn: '查看我的折扣红包'
          },
          'serviceOrder': {
            title: '打赏完成',
            img: require('../img/dashang.png'),
            info: '打赏成功！',
            backBtn: '返回个人中心'
          },
          'paySucess': {
            title: '付款结果',
            img: require('../img/pmresult.png'),
            info: '付款成功 ！',
            backBtn: '返回首页'
          },
          'payFailure': {
            title: '付款结果',
            img: require('../img/shibai.png'),
            info: '付款失败 ！',
            backBtn: '返回付款页面'
          },
          'commitSucess': {
            title: '提交结果',
            img: require('../img/comresult.png'),
            info: '提交成功 ！',
            backBtn: '返回客服中心'
          },
        }
      }
    },
    mounted() {
      /*this.orderId = this.$route.query.orderId*/
    },
    methods: {
      back_person() {
        /*this.$router.push({path: '/my/persionDatailMsg', query: {orderId: this.orderId}})*/
        this.$router.push({path: '/shop/shopIndex'})
      }
    }
  }
</script>
<style scoped>
  .vux-header { background-color: #ffffff;}
  .top >>> .vux-header-title {color: #000;}
  .top >>> .vux-header-left .left-arrow:before {border-color:#000;}

  .cr_content {
    height: 100%;
    background-color: #ffffff;
    margin-top: 0.10rem;
    padding: 1.35rem 1.76rem;
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
    width: 3.90rem;
    height: 0.80rem;
    border: 1px solid #f86e0e;
    color: #f86e0e;
    border-radius: 0.40rem;
    text-align: center;
    line-height: 0.80rem;
    font-size: 0.32rem;
  }

</style>
