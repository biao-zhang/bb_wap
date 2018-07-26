<template>
  <div class="goodsItem">
    <div class="inputBox"><img v-if="datas.isCheck" @click="changeState(0)" class="img1" src="../../img/cartRadioTrue.png"/> <img v-else="datas.isCheck" @click="changeState(1)" class="img1" src="../../img/cartRadioFalse.png"/> </div>
    <div class="imgBox"><img class="img2" :src="datas.goodsImgMaster"/> </div>
    <div class="imgBoxR" v-if="moreState">
      <div class="line1">
        <span class="s0 ">{{datas.goodsName}}</span>
      </div>
      <div class="line2" >
        <span v-if="datas.goodsSpecs!=''"><span class="s1">规格：</span>{{datas.goodsSpecs}}</span>
      </div>
      <div class="line3" style="line-height: 0.6rem;"><span class="s2">￥{{datas.goodsPrice}}</span></div>
      <div class="line3">
        <span class="s2">
          <sel-number :min="1" :max="datas.stockNum" :value="datas.buyNum" @changeNum="changeNum"></sel-number>
        </span>
        <span class="s3">库存:{{datas.stockNum}}</span>
      </div>
    </div>
    <!--这种没用到
    <div class="imgBoxR" v-else="moreState">
      <div class="line1">
        <inline-x-number :min="0" :max="5" :fillable="true" width="0.8rem" :value="datas.buyNum" @on-change="changeNum"></inline-x-number>
      </div>
      <div class="line2"><span class="s1">鹅鹅鹅饿鹅鹅鹅饿鹅鹅鹅饿鹅鹅鹅</span> </div>
      <div class="line3"><span class="s2">￥{{datas.goodsPrice}}.00</span><span class="s3"><img class="img3" src="../../img/name.png"> </span></div>
    </div>
    -->
  </div>
</template>
<script>
//  import { InlineXNumber } from 'vux'
import selNumber from "@/components/common/selNumber";
export default {
  data() {
    return {};
  },
  computed: {},
  watch: {},
  props: {
    datas: {
      type: Object,
      default: () => {
        return {};
      }
    },
    index: {
      type: String,
      default: ""
    },
    moreState: {
      type: Boolean,
      default: true
    }
  },
  mounted() {
    
  },
  components: { selNumber },
  methods: {
    changeState(a) {
      this.$store.dispatch({
        type: "cart/checked",
        isCheck: this.datas.isCheck == 1 ? 0 : 1,
        cartId: this.datas.cartId
      });
    },
    changeNum(a) {
      console.log(a);
      this.$store.dispatch({
        type: "cart/addNum",
        cartId: this.datas.cartId,
        num: a
      });
    }
  }
};
</script>
<style scoped>
.goodsItem {
  width: 100%;
  height: 100%;
  display: flex;
}

.inputBox {
  height: 100%;
  width: 0.4rem;
  margin-left: 0.1rem;
  padding-top: 1.05rem;
  box-sizing: border-box;
}
.inputBox .img1 {
  width: 0.4rem;
  height: 0.4rem;
  display: inline-block;
}

.imgBox {
  width: 2.4rem;
  height: 2.4rem;
  margin-left: 0.4rem;
  padding: 0.07rem 0;
}
.imgBox .img2 {
  width: 100%;
  height: 100%;
}

.imgBoxR {
  width: 3.85rem;
  height: 100%;
  padding-left: 0.25rem;
  box-sizing: border-box;
}
.imgBoxR .line1 {
 
      height: .8rem;
    color: #3c3c3c;
    font-size: .3rem;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    overflow: hidden;
    -webkit-box-orient: vertical;
}
.imgBoxR .line1 .s0 {
      color: #3c3c3c;
    font-size: .3rem;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    overflow: hidden;
    -webkit-box-orient: vertical;
}
.imgBoxR .line1 >>> svg {
  width: 9px;
}
.imgBoxR .line1 >>> .vux-number-selector svg {
  fill: #f86e0e;
}
.imgBoxR .line1 >>> .vux-number-selector.vux-number-disabled svg {
  fill: #ccc;
}
.imgBoxR .line2 {
  height: 0.4rem;
}
.imgBoxR .line2 .s1 {
  font-size: 0.24rem;
  color: #9a9a9a;
}
.imgBoxR .line3 {
}
.imgBoxR .line3 .s2 {
  float: left;
  font-size: 0.3rem;
  color: #f86e0e;
  width: 2rem;
}
.imgBoxR .line3 .s3 {
  font-size: 0.24rem;
  color: #9a9a9a;
  float: right;
  line-height: 0.4rem;
}
.imgBoxR .line3 .s3 .img3 {
  width: 0.3rem;
}

.imgBoxR .line3 >>> svg {
  width: 9px;
}
.imgBoxR .line3 >>> .vux-number-selector svg {
  fill: #f86e0e;
}
.imgBoxR .line3 >>> .vux-number-selector.vux-number-disabled svg {
  fill: #ccc;
} 
</style>
