<template>
  <div class="indexGroomItem">
    <router-link :to="{path:'/y/shopGoodsDetail',query:{recommendId:datas.goodsId,goodsType:1}}">
      <div class="box"><img class="img1" :src='datas.goodsImgMaster'/> </div>
      <div class="tit_tit">{{datas.goodsName}}</div>
      <div class="price">￥{{datas.goodsPrice}}</div>
    </router-link>
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

    }

  }



</script>
<style scoped>
  .indexGroomItem{width:3.5rem;height: 4.8rem;box-shadow: 0 2px 6px #ccc;margin-bottom: 0.3rem;padding-bottom: 0.2rem;}
  .indexGroomItem .box{width:3.15rem;height: 3.15rem;margin:0.18rem;}
  .indexGroomItem .box .img1{width:100%;height: 100%;}
  .indexGroomItem .tit_tit{font-size: 0.26rem;height: 1rem;color:#3c3c3c;text-align: center;line-height: 0.5rem;display: -webkit-box;-webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;padding:0 0.1rem;}
  .indexGroomItem .price{font-size: 0.3rem;color:#f86e0e;text-align: center}

</style>
