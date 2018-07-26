<template>
  <div class="evaluation">
        <div class="xian"></div>
        <evaluation-nav @tabVal="tabVal" v-if="GoodsDetailData"> </evaluation-nav>
        <div class="xian"></div>
        <!--评价-->
        <div class="assess">
           <comment-content
             :datas="item"
             v-if="Object.keys(GoodsDetailData).length !== 0 && flag === 0"
             v-for="(item,index) in GoodsDetailData"
             :key="index"
           > </comment-content>
          <comment-content
            :datas="item"
            v-if="Object.keys(GoodsDetailData).length !== 0 && flag === 1"
            v-for="(item,index) in GoodsDetailData"
            :key="index"
          > </comment-content>
          <comment-content
            :datas="item"
            v-if="Object.keys(GoodsDetailData).length !== 0 && flag === 2"
            v-for="(item,index) in GoodsDetailData"
            :key="index"
          > </comment-content>
          <comment-content
            :datas="item"
            v-if="Object.keys(GoodsDetailData).length !== 0 && flag === 3"
            v-for="(item,index) in GoodsDetailData"
            :key="index"
          > </comment-content>
        </div>
  </div>
</template>
<script>
import { Scroller } from "vux";
import commentContent from "@/components/shop/storedetails/assembly/commentContent";
import evaluationNav from "@/components/shop/storedetails/assembly/evaluationNav";
import { getSearchEvaluateByGoodsId } from "@/api/shop";

export default {
  data() {
    return {
      flag: 0,
      params: {
        pageNum: 1,
        pageSize: 10,
        goodsId: '',
      },

      GoodsDetailData: [],
    };
  },

  components: { evaluationNav, Scroller, commentContent },
  computed: {
    // 根据商品ID查询全部评价
   /* goodsComment() {
      return this.$store.state.goodsDetail.goodsComment;
    }*/
  },
  mounted() {
    // 根据商品ID查询全部评价
    /*this.$store.dispatch({
      type: "goodsDetail/goodsComment"
    });*/
    this.params.goodsId = this.$route.query.recommendId

    this._getSearchEvaluateByGoodsId()
  }  ,
  methods: {
    tabVal(val) {
      this.flag = val;
      if (val === 0) {

        this._getSearchEvaluateByGoodsId('') // 传0，没法请求到数据

      } else if (val === 1) {

        this._getSearchEvaluateByGoodsId(val)

      } else if (val === 2) {

        this._getSearchEvaluateByGoodsId(val)

      } else if (val === 3) {

        this._getSearchEvaluateByGoodsId(val)

      }
    },
    _getSearchEvaluateByGoodsId( parms ) {
      const { goodsId, pageNum, pageSize } = this.params;
      let params = {
        goodsId: goodsId,
        pageSize: pageSize,
        pageNum: pageNum,
        evaluateLevel: parms, // 评价级别(1,好；2.中；3.差)
      };
      getSearchEvaluateByGoodsId(params).then(res => {
        if (res.result) {
          let data = res.data;
          this.GoodsDetailData = data;
        }
        console.log('全部评价', res)
      });
    }
  }
};
</script>
<style scoped>
.xian {
  width: 100%;
  height: 0.1rem;
  background: #f5f5f5;
}
.evaluate_top {
  margin-top: 0.1rem;
  padding: 0.2rem;
  display: flex;
  justify-content: space-between;
}
.evaluate_top span {
  padding: 0.12rem 0.2rem;
  font-size: 0.24rem;
  color: #fd593d;
  border:1px solid #fd593d;
  border-radius: 0.4rem;
}
/*评价区*/
.assess {
  padding: 0 0.2rem;
}
/*评价头*/
.assess_top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 0.2rem;
}
.left_one {
  display: flex;
  align-items: center;
}
.left_one img {
  width: 0.9rem;
  height: 0.9rem;
  border-radius: 50%;
  border: 0.06rem solid #ffb47f;
}
.left_one p {
  font-size: 0.3rem;
  color: #333333;
  font-weight: 600;
  margin-left: 0.16rem;
}
.right_one {
  font-size: 0.24rem;
  color: #9a9a9a;
}
/*评价内容*/
.assess_center {
  padding: 0 0 0.3rem 1rem;
  border-bottom: 1px solid #ededed;
}
.assess_center p:first-child {
  font-size: 0.28rem;
  color: #6b6b6b;
  line-height: 0.5rem;
}
.assess_center p:last-child {
  font-size: 0.24rem;
  color: #9a9a9a;
  line-height: 0.4rem;
}
/*滑动图*/
.assess_img {
  overflow: auto;
  margin: 0.3rem 0;
}
.images1 {
  display: -moz-box;
  display: -webkit-box;
  display: box;
}
.images1 .img1 {
  width: 1.4rem;
  height: 1.4rem;
  margin-left: 0.2rem;
  display: flex;
}
.images1 div:first-child {
  margin: 0;
}
.images1 img {
  width: 100%;
  height: 100%;
}
::-webkit-scrollbar {
  display: none;
}
</style>
