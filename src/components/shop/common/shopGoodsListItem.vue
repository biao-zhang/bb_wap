<template>
  <div class="shopGoodsListItem">
    <div class="goodsLogoBox"><img class="goodsLogo" :src='datas.goodsImgMaster'/> </div>
    <div class="goodsItemR">
      <div class="line1 re-twoLineOverFlow" >{{ datas.goodsName }}</div>
      <div class="line2">
        <span>￥{{ datas.goodsPrice }}</span>
        <span v-if="datas.gtVal === 1"></span>
        <span v-if="datas.gtVal === 2"><img src="../img/fresh3.png"/></span>
        <span v-if="datas.gtVal === 3"><img src="../img/newProduct3.png"/></span>
        <span v-if="datas.gtVal === 4"><img src="../img/seckill3.png"/></span>
      </div>
      <div class="line3">月销量{{ datas.saleNum }}{{datas.goodsUnit}}</div>
    </div>
  </div>
</template>
<script>

  export default {
    data(){
      return{


      }
    },
    props:{
      msg:{
        type:String,
        default:''
      },
      datas: {
        type: Object,
        default: () => {}
      }
    },
    mounted(){

    },
    methods:{


    }
  }
</script>
<style scoped>
  .shopGoodsListItem{width:6.9rem;margin:0 auto;height: 2.5rem;display: flex;justify-content:space-between;padding:0.3rem 0;border-bottom:1px solid #ededed;}

  .shopGoodsListItem .goodsLogoBox{width:2.5rem;height: 2.5rem;}
  .shopGoodsListItem .goodsLogoBox .goodsLogo{width:100%;height: 100%;}

  .shopGoodsListItem .goodsItemR{width:4.2rem;margin:0.1rem 0;}
  .shopGoodsListItem .goodsItemR .line1{width:100%;font-size: 0.3rem;color:#3c3c3c;line-height: 0.5rem;display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;}
  .shopGoodsListItem .goodsItemR .line2{width:100%;font-size: 0.34rem;color:#f86e0e;line-height: 0.5rem;margin-top:0.4rem;}
  .shopGoodsListItem .goodsItemR .line3{width:100%;font-size: 0.24rem;color:#9a9a9a;line-height:1rem;text-align:right;}

  .line2 img {
    width: 0.84rem;
    height: 0.41rem;
  }
</style>
