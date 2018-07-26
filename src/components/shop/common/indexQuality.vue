<template>
  <div class="indexQualityBox">
    <div class="line1">
      <router-link v-for="(item,index) in datas" :key="index" v-if="index===0" :to="{path:'/y/preferredGoods',query:{title:item.advname,excellentId:item.categoryId}}"><img class="item1" :src='item.advertisement_type'/></router-link>
      <router-link v-for="(item,index) in datas" :key="index" v-if="index===1" :to="{path:'/y/preferredGoods',query:{title:item.advname,excellentId:item.categoryId}}"><img class="item1" :src='item.advertisement_type'></router-link>
    </div>
    <div class="line2">
      <router-link v-for="(item,index) in datas" :key="index" v-if="index===2" :to="{path:'/y/preferredGoods',query:{title:item.advname,excellentId:item.categoryId}}"><img class="item2" :src='item.advertisement_type'/></router-link>
      <router-link v-for="(item,index) in datas" :key="index" v-if="index===3" :to="{path:'/y/preferredGoods',query:{title:item.advname,excellentId:item.categoryId}}"><img class="item2" :src='item.advertisement_type'/></router-link>
      <router-link v-for="(item,index) in datas" :key="index" v-if="index===4" :to="{path:'/y/preferredGoods',query:{title:item.advname,excellentId:item.categoryId}}"><img class="item2" :src='item.advertisement_type'/></router-link>
    </div>
  </div>
</template>
<script>

  export default {
    data(){
      return{

      }
    },
    mounted(){

    },
    props:{
      datas:{
        type:Array,
        default:function () {
          return []
        }
      }
    },

  }



</script>
<style scoped>
  .indexQualityBox{width:100%;padding:0.3rem 0.27rem;box-sizing: border-box;}

  .line1{display: flex;justify-content: space-between;}
  .line1 .item1{width:3.4rem;height: 2rem;padding-bottom: 0.1rem;}

  .line2{display: flex;justify-content: space-between;}
  .line2 .item2{width:2.25rem;height: 3rem;}


</style>
