<template>
  <div class="indexNavItem">
    <router-link :to="{path:'/x/shopGoodsList',query:{shopGoodsListTitle:datas.categoryName,categoryId:datas.categoryId}}">
      <div class="indexNavImgBox"><img :src='datas.categoryUrl' class="img"> </div>
      <p class="titBox">{{datas.categoryName}}</p>
    </router-link>
  </div>
</template>
<script>
  /**
   * @props datas(O)   分类详情
   * @props index(N):0 ~ 7   分类索引
   * @router /x/shopGoodsList query:shopGoodsListTitle
   * @router /x/classify
   */
  export default {
    data(){
      return{

      }
    },
    props:{
      datas:{
        type:Object,
        default:()=>{
          return{}
        }
      },
    },
    mounted(){

    }

  }



</script>
<style scoped>
  .indexNavItem{margin-top:0.2rem;width:25%;}
  .indexNavItem .indexNavImgBox{width:1.2rem;height: 1.2rem;margin:auto;}
  .indexNavItem .indexNavImgBox .img{width:1.2rem;height:1.2rem;border-radius:50%;}
  .indexNavItem .titBox{text-align: center;font-size: 0.3rem;color:#3c3c3c;line-height: 0.64rem;}

</style>
