<template>
  <div>
    <div class="top">
      <x-header :left-options="{backText: ''}">{{ account[test].title }}<a @click="publish" slot="right">{{ account[test].explain }}</a></x-header>
    </div>
    <div class="cr_content">
      <img :src="account[test].img" />
      <div class="cr_success" :class="{cr_diff: test === 'card'}">{{ account[test].money }}<span>元</span></div>
    </div>
    <div>
      <my-btn :btn-text="account[test].message"> </my-btn>
    </div>
    <div class="special" v-if="test === 'cash' || test === 'precard'">
      <my-btn :btn-text="account[test].message2"> </my-btn>
    </div>
  </div>
</template>
<script>
  import { XHeader } from 'vux'
  import myBtn from '../common/myBtn'
  export default {
    components: { XHeader, myBtn },
    data() {
      return {
        test: 'cash',
        account: {
          'integral': {
            title: '积分账户',
            money: '10.00',
            img: require('../img/integral.png'),
            message: '积分明细',
            explain: '积分说明'
          },
          'cash': {
            title: '现金账户',
            money: '10.00',
            img: require('../img/integral.png'),
            message: '充值',
            message2: '现金明细',
            explain: '现金说明'
          },
          'precard': {
            title: '预付卡账户',
            money: '10.00',
            img: require('../img/precard.png'),
            message: '充值',
            message2: '明细',
            explain: '卡包'
          }
        },

      }
    },
    mounted(){
      this.test=this.$route.query.title
    },
    methods: {
      publish() {
        console.log('点我了')
      }
    }
  }
</script>
<style scoped>
  .vux-header { background-color: #ffffff;}
  .top >>> .vux-header-title {color: #000;}
  .top >>> .vux-header-left .left-arrow:before {border-color:#000;}
  .top >>> .vux-header-right a {color: #f86e0e;}

  .cr_content {
    margin-top: 0.10rem;
    padding: 1.60rem 2.30rem 0 2.30rem;
  }
  .cr_content img {
    width: 100%;
  }
  .cr_success {
    padding: 0.51rem 0 0.86rem 0;
    text-align: center;
    font-size: 0.48rem;
    color: #db001b;
  }
  .cr_diff {
    color: #9a9a9a;
  }

  .special >>> .back {
    background-color: #f15352;
  }

</style>

