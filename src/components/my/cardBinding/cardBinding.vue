<template>
  <div>
    <div class="top">
      <x-header :left-options="{backText: ''}">{{ cardbinding[test].title }}</x-header>
    </div>
    <div class="cr_content">
      <img :src="cardbinding[test].img" />
      <div class="cr_success" :class="{cr_diff: test === 'card'}">{{ cardbinding[test].info }}</div>
    </div>
    <div>
      <my-btn :btn-text="cardbinding[test].message"> </my-btn>
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
        test: 'bindResult',
        cardbinding: {
          'bindResult': {
            title: '绑定结果',
            info: '恭喜您！绑定成功',
            img: require('../img/cardbinding.png'),
            message: '返回卡包',
          },
          'card': {
            title: '卡包',
            info: '您还没有绑定预付卡',
            img: require('../img/carding.png'),
            message: '去绑定',
          },
        },

      }
    }
  }
</script>
<style scoped>
  .vux-header { background-color: #ffffff;}
  .top >>> .vux-header-title {color: #000;}
  .top >>> .vux-header-left .left-arrow:before {border-color:#000;}

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
    font-size: 0.30rem;
  }
  .cr_diff {
    color: #9a9a9a;
  }

</style>

