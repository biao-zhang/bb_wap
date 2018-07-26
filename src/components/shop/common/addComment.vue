<template>
  <div>
    <div class="top">
      <x-header :left-options="{backText: ''}">{{ msg_m }}<a @click="publish" slot="right">{{ msg_r }}</a></x-header>
    </div>
    <div class="p_content">
      <div class="p_content_t">
        <div class="t_img">
          <img src="../img/timg.png"/>
        </div>
        <div class="t_two">
          <div class="t_title">{{ t_title }}</div>
          <div class="t_comment">
            <span>
              <div @click="goodComment" v-bind:class="{bgComment: goodbgComment }">
                 <i class="iconfont icon-haoping"></i>
              </div>
              <span>好评</span>
            </span>
            <span>
              <div @click="middleComment" v-bind:class="{bgComment: middlebgComment }">
                <i class="iconfont icon-pingjia"></i>
              </div>
              <span>中评</span>
            </span>
            <span>
              <div @click="poorComment" v-bind:class="{bgComment: poorbgComment }">
                <i class="iconfont icon-chaping"></i>
              </div>
              <span>差评</span>
            </span>
          </div>
        </div>
      </div>
      <div class="p_content_m">
        <div>
          <group>
            <x-textarea :max="140" :placeholder="tips" :height="180"></x-textarea>
          </group>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import { XHeader, Group, XTextarea,Rater } from 'vux'
  const getImgURL = require('@/assets/js/getImgURL.js')
  export default {
    components: {
      XHeader,
      Group,
      XTextarea,
      Rater,
    },
    data() {
      return {
        msg_m: '发表追评',
        msg_r: '发布',
        t_title: '兰蔻套装五色',
        tips: '写下购买体会和使用感受来帮助其他小伙伴',
        goodbgComment: true,
        middlebgComment: false,
        poorbgComment: false,
      }
    },
    methods: {
      publish() {
        console.log('发布成功')
      },
      goodComment() {
        this.goodbgComment = true;
        this.middlebgComment = false;
        this.poorbgComment = false;
        console.log('好评')
      },
      middleComment() {
        this.goodbgComment = false;
        this.middlebgComment = true;
        this.poorbgComment = false;
        console.log('中评')
      },
      poorComment() {
        this.goodbgComment = false;
        this.middlebgComment = false;
        this.poorbgComment = true;
        console.log('差评')
      },

    }
  }
</script>
<style scoped>
  .vux-header { background-color: #ffffff;}
  .top >>> .vux-header-title {color: #000;}
  .top >>> .vux-header-left .left-arrow:before {border-color:#000;}
  .top >>> .vux-header-right a {color: #f86e0e;}

  .p_content_t {
    background-color: #ffffff;
    padding: 0.30rem 0.20rem;
    margin-top: 0.11rem;
    display: flex;
  }
  .t_two {
    margin-left: 0.30rem;
    padding: 0.15rem 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    font-size: 0.30rem;
    color: #3c3c3c;
  }
  .t_img {border: 1px solid #ccc;}
  .t_img img { width: 2.19rem;}
  .t_comment {display: flex;}
  .t_comment span {
    margin-right: 0.20rem;
  }
  .bgComment,.hideNAmeComment {color: #fd593d;}
  .t_comment i { font-size: 0.50rem; }
  .p_content_m {
    font-size: 0.30rem;
    color: #333333;
  }


</style>
