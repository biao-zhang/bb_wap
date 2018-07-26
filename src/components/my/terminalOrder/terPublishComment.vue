<template>
  <div>
    <div class="top">
      <x-header :left-options="{backText: ''}">{{ msg_m }}<a @click="publish" slot="right">{{ msg_r }}</a></x-header>
    </div>
    <div class="p_content">
      <div class="p_content_t">
        <div class="t_img">
          <img :src="singleGoods ? singleGoods.goodsImgMaster : require('../img/timg.png')" />
        </div>
        <div class="t_two">
          <div class="t_title">{{ singleGoods.goodsName }} {{ singleGoods.goodsSpecs }}</div>
          <div class="t_comment" v-if="type === 'evaluate'">
            <span>
              <div @click="hpClick(1)" style="margin-right: 10px; cursor: pointer" :class="{ishp: ishp === 1}">
                 <i class="iconfont icon-haoping"></i>
              </div>
              <span>好评</span>
            </span>
            <span>
              <div @click="hpClick(2)" style="margin-right: 10px; cursor: pointer" :class="{ishp: ishp === 2}">
                <i class="iconfont icon-pingjia"></i>
              </div>
              <span>中评</span>
            </span>
            <span>
              <div @click="hpClick(3)" style="margin-right: 10px; cursor: pointer" :class="{ishp: ishp === 3}">
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
            <x-textarea
              v-model="textarea"
              :max="140"
              :placeholder="tips"
              :height="180"
            > </x-textarea>
          </group>
        </div>
        <div class="add_picture" v-if="type === 'evaluate'">
          <upload
            :maxUploadNumber="5"
            @uploadItems="getInputItems"
            @uploadUrls="getInput"
          > </upload>
        </div>
        <div class="hideNAme" v-if="type === 'evaluate'">
          <!--<div @click="hideNAme"><i class="iconfont icon-iconfontxuanzhong1" v-bind:class="{hideNAmeComment: ishideNAme }"></i>匿名</div>-->
          <div>
            <input @click="isCheck" type="checkbox" :checked="check ? 'checked' : ''" />
            <span>匿名评价</span>
          </div>
          <div class="hideNAmeTips">你写的评价会以匿名的形式展现</div>
        </div>
      </div>
      <div class="p_content_f" v-if="type === 'evaluate'">
        <div class="p_content_f_item">商品满意度</div>
        <div>
          <rater v-model="rate" active-color="#fd593d"> </rater>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import { XHeader, Group, XTextarea,Rater } from 'vux'
  import upload from "@/components/common/upload"
  import { o2oByItemId, o2oAddEvaluate, o2oAddChaseEvaluate } from "@/api/personally"

  export default {
    components: {
      XHeader,
      Group,
      XTextarea,
      Rater,
      upload,
    },
    data() {
      return {
        msg_m: '发表评价',
        msg_r: '发布',
        tips: '写下购买体会和使用感受来帮助其他小伙伴',

        singleGoods: '',
        type: '', // 是评价还是追加评价
        ishp: 1, // 好中差评
        check: false, // 是否匿名
        textarea: '',  // 文本框
        rate: 5,     // 评分,
      }
    },
    mounted() {
      this.itemId = this.$route.query.itemId
      this.type = this.$route.query.type

      this._o2oByItemId()
    },
    methods: {
      publish() {

        if (this.type === 'evaluate') {
          // 评价
          o2oAddEvaluate({
            detailId: this.itemId, // 小心这里两个id是不一样的
            text: this.textarea,
            hp: this.ishp,
            lv: this.rate,
            isniming: this.check ? 1 : 0, // 是否匿名（0：否，1：是）
            imgs: this.imgs,
          })
            .then( res => {

              this.$router.push({path: '/z/commentResult'})
              console.log('o2o商品评价', res)

            })
        } else {
          // 追评
          o2oAddChaseEvaluate({
            detailId: this.itemId, // 小心这里两个id是不一样的
            text: this.textarea,
          })
            .then( res => {

              this.$router.push({path: '/z/commentResult'})
              console.log('o2o商品追评', res)

            })
        }

      },
      // 好中差评
      hpClick(val) {
        this.ishp = val
        console.log(this.ishp)
      },
      // 是否匿名（0：否，1：是）
      isCheck() {
        this.check = !this.check
        console.log(this.check)
      },
      // 上传图片
      getInputItems(a){
        console.log('a', a)

      },
      getInput(b){
        console.log('b', b)
      },
      // o2o单个商品详情
      _o2oByItemId() {
        o2oByItemId({
          itemId: this.itemId
        })
          .then( res => {

            this.singleGoods = res.data
            console.log('o2o单个商品详情', res.data)

          })
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
  .t_img {}
  .t_img img { width: 2.19rem;}
  .t_comment {display: flex; margin-top: 0.10rem;}
  .t_comment span {
    margin-right: 0.20rem;
  }
  .bgComment,.hideNAmeComment {color: #fd593d;}
  .t_comment i { font-size: 0.50rem; }
  .p_content_m {
    font-size: 0.30rem;
    color: #333333;
  }
  .add_picture {
    padding: 0.30rem;
    background-color: #ffffff;
  }

  .imgPhoto { width: 1.40rem; height: 1.40rem; }
  .hideNAme {
    border-top: 1px solid #eee;
    padding: 0.30rem;
    background-color: #ffffff;
    display: flex;
    justify-content: space-between;
  }
  .hideNAme i { margin-right: 0.10rem;}
  .hideNAmeTips {
    font-size: 0.26rem;
    color: #999999;
  }
  .p_content_f {
    margin-top: 0.10rem;
    padding: 0.30rem;
    background-color: #ffffff;
    display: flex;
    font-size: 0.30rem;
    color: #333333;
  }
  .p_content_f_item { margin-right: 0.20rem;}

  .ishp {
    color: #ff5252;
  }
</style>
