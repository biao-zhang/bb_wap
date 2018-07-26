<template>
  <div>
    <div class="top">
      <x-header :left-options="{backText: ''}">{{msg}}</x-header>
    </div>
    <div class="initiator">
      <div class="initiatorLeft">
        <span>发起人：</span>
        <span>联系电话：</span>
      </div>
      <div class="initiatorRight">
        <span>黄埔一一</span>
        <span>1256444896</span>
      </div>
    </div>
    <div v-for="item in details_img">
      <sdetails :img-message="item.img" :imgbg-message="item.imgBg"></sdetails>
    </div>
  </div>
</template>
<script>
  import sdetails from '../../service/details/details.vue'
  import { XHeader } from 'vux'
  export default {
    components: {
      sdetails,
      XHeader
    },
    data() {
      return {
        msg: '报名详情',
        details_img: [
          {img: require('../../service/img/detais_tou.png'), imgBg: 'url(' + require("../../service/img/notails.png") + ')'},
          {img: require('../../service/img/detais_tou.png'), imgBg: 'url(' + require("../../service/img/deatils_y.png") + ')'},
          {img: require('../../service/img/detais_tou.png'), imgBg: 'url(' + require("../../service/img/deatils_y.png") + ')'},
        ]
      }
    }
  }
</script>
<style scoped>
  .vux-header { background: #ffffff;}
  .top >>> .vux-header-title {color: #000;}
  .top >>> .vux-header-left .left-arrow:before {border-color:#000;}

  .initiator {
    margin: 0.2rem auto 0 auto;
    width: 6.81rem;
    height: 2.11rem;
    background-color: #fff4ed;
    box-shadow: 1px 1px 5px #ccc;
    display: flex;
    padding-left: 0.30rem;
    font-size: 0.30rem;
  }
  .initiatorLeft,.initiatorRight {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }
  .initiatorLeft {
    width: 1.55rem;
    text-align: right;
    margin-right: 0.35rem;
  }
  .initiatorRight {

  }

</style>
