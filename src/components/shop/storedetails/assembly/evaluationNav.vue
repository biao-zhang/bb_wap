<template>
  <div class="seckillTab">
    <div class="item" :class="{'show':curIndex===0}" @click="change(0)">
      <span class="s1">全部</span>
    </div>
    <div class="item" :class="{'show':curIndex===1}" @click="change(1)">
      <span class="s1">
        <img src="../../img/good1.png" alt="">好评({{ countEvaluateByLevel.goodNum }})
      </span>
    </div>
    <div class="item" :class="{'show':curIndex===2}" @click="change(2)">
      <span class="s1">
        <img src="../../img/good2.png" alt="">中评({{ countEvaluateByLevel.secondaryNum }})
      </span>
    </div>
    <div class="item" :class="{'show':curIndex===3}" @click="change(3)">
      <span class="s1"><img src="../../img/good3.png" alt="">差评({{ countEvaluateByLevel.poorNum }})</span>
    </div>
  </div>
</template>
<script>

  import { countEvaluateByLevel } from "@/api/shop";

  export default {
    data(){
      return{
        curIndex:0,

        /*num: '',*/ // 评价数量
        goodsId: '',
        countEvaluateByLevel: [],
      }
    },

    mounted() {
      this.goodsId = this.$route.query.recommendId

      this._countEvaluateByLevel()
    },

    methods:{
      change(a){
        this.curIndex=a;
        if (a === 0) {
          // 全部
          /*this.num = itemLength*/
          this.$emit('tabVal',this.curIndex)
        } else if (a === 1) {
          // 好评
         /* this.$store.dispatch({
            type: 'goodsDetail/goodsComment',
            evaluateLevel: a
          })*/
          this.$emit('tabVal',this.curIndex)
        } else if (a === 1) {
          // 中评
         /* this.$store.dispatch({
            type: 'goodsDetail/goodsComment',
            evaluateLevel: a
          })*/
          this.$emit('tabVal',this.curIndex)
        } else {
          // 差评
         /* this.$store.dispatch({
            type: 'goodsDetail/goodsComment',
            evaluateLevel: a
          })*/
          this.$emit('tabVal',this.curIndex)
        }
      },
      _countEvaluateByLevel() {
        countEvaluateByLevel({
          goodsId: this.goodsId,
        })
          .then( res => {

            this.countEvaluateByLevel = res.data
            console.log('商品统计次数', res)

          })
      },

    }
  }

</script>
<style scoped>
  .seckillTab{width:100%;display: flex; justify-content: space-between;padding:0.2rem; box-sizing: border-box}


  .item.show .s1{background: -webkit-linear-gradient(left, #f86e0e, #f45f32, #f15451);color:#fff;}
  .item.show .s1 img{
    display: none;
  }
  .item .s1{font-size: 0.24rem;
            text-align: center; padding:0.08rem 0.3rem;
            border:1px solid #fd593d;border-radius:0.4rem;color:#fd593d;
            display: flex;
            align-items:center;
        }
  .item .s1 img{width:0.3rem;height:0.3rem;}

</style>
