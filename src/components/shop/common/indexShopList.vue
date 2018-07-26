<template>
  <div class="indexShopList">
    <!--<router-link :to="{path:'/y/shopGoodsDetail',query:{recommendId:datas.goodsId,goodsType:datas.gtVal}}">-->
    <div @click="classification">
      <div class="box"><img class="img1" :src='datas.goodsImgMaster'/> </div>
      <div class="tit re-twoLineOverFlow ">{{datas.goodsName}}</div>
      <div class="price">￥{{datas.goodsPrice}}</div>
    </div>
    <!--</router-link>-->
  </div>
</template>
<script>

  export default {
    data(){
      return{

      }
    },
    props:{
      datas:{
        type:Object,
        default:function () {
          return {}
        }
      }
    },
    mounted(){

    },
    methods:{
      classification(){
        console.log(this.datas.gtVal)
        if(this.datas.gtVal == 1){   //普通商品
          this.$router.push({path:'/y/shopGoodsDetail',query:{recommendId:this.datas.goodsId,goodsType:1}})
        }else if(this.datas.gtVal == 2){   //生鲜
          this.$router.push({path:'/y/shopGoodsDetail',query:{recommendId:this.datas.goodsId,goodsType:3,activityType:2}})
        }else if(this.datas.gtVal == 3){   //新品
          this.$router.push({path:'/y/shopGoodsDetail',query:{recommendId:this.datas.goodsId,goodsType:1,activityType:3}})
        }else if(this.datas.gtVal == 4){   //秒杀
          this.$router.push({path:'/y/shopGoodsDetail',query:{recommendId:this.datas.goodsId,goodsType:3,activityType:1}})
        }
      }
    }
  }



</script>
<style scoped>
  .indexShopList{width:3.5rem;height: 4.8rem;box-shadow: 0 2px 6px #ccc;margin-bottom: 0.3rem;}
  .indexShopList .box{width:3.15rem;height: 3.15rem;margin:0.18rem;}
  .indexShopList .box .img1{width:100%;height: 100%;}
  .indexShopList .tit{font-size: 0.3rem;color:#3c3c3c;text-align: center;}
  .indexShopList .price{font-size: 0.3rem;color:#f86e0e;text-align: center}

</style>
