<template>
  <div class="classifyItem">
    <div class="imgBox"><img :src='datas.categoryUrl' class="img"> </div>
    <p class="titBox">{{datas.categoryName}}</p>
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
  .classifyItem{width:1.7rem;margin:0.13rem 0;}

  .classifyItem .imgBox{width:1.3rem;height: 1.3rem;margin:0 0.25rem;}
  .classifyItem .imgBox img{width:1.3rem;height: 1.3rem;}
  .classifyItem .titBox{text-align: center;line-height: 0.6rem;height:0.6rem;width:100%;font-size: 0.24rem;color:#999;}

</style>
