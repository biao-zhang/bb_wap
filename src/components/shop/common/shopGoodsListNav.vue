<template>
  <div class="shopGoodsListNav">
    <span class="item" @click="changeItem1" :class="{'orange':itemIndex ==0}">综合</span>
    <span class="item" @click="changeItem2" :class="{'orange':itemIndex ==1}">价格<img v-if="sort2==0" src="../../../assets/img/sml.png"/><img v-if="sort2==1" src="../../../assets/img/l-s.png"/><img v-if="sort2==2" src="../../../assets/img/s-l.png"/></span>
    <span class="item" @click="changeItem3" :class="{'orange':itemIndex ==2}">销量<img v-if="sort3==0" src="../../../assets/img/sml.png"/><img v-if="sort3==1" src="../../../assets/img/l-s.png"/><img v-if="sort3==2" src="../../../assets/img/s-l.png"/></span>
  </div>
</template>
<script>

  export default {
    data(){
      return{
        itemIndex:0,
        sort2:0,
        sort3:0,

      }
    },
    props:{
      msg:{
        type:String,
        default:'全部分类'
      }
    },
    mounted(){

    },
    methods:{

      changeItem1(){
        this.itemIndex = 0;
        this.sort2 = 0;
        this.sort3 = 0;

        this.$emit('sort', 1)

      },
      changeItem2(){
        this.itemIndex = 1;
        if(this.sort2===2||this.sort2===0){
          this.sort2=1

          this.$emit('sort', 3)

        }else{
          this.sort2=2

          this.$emit('sort', 2)

        }
        this.sort3 = 0;
        /*this.$emit("shopGoodsListNavVal",[this.itemIndex,this.sort2,this.sort3,])*/
      },
      changeItem3(){
        this.itemIndex = 2;
        if(this.sort3===2||this.sort3===0){
          this.sort3=1

          this.$emit('sort', 5)

        }else{
          this.sort3=2

          this.$emit('sort', 4)

        }
        this.sort2 = 0;
        /*this.$emit("shopGoodsListNavVal",[this.itemIndex,this.sort2,this.sort3,])*/
      },

    }
  }
</script>
<style scoped>
  .shopGoodsListNav .item.orange{color:#f86e0e;border-bottom: 0.08rem solid #f86e0e;}
  .shopGoodsListNav{width:100%;height: 1rem;display: flex;justify-content: space-around;padding:0.2rem 0.6rem 0;box-sizing: border-box;background-color: white;box-shadow: 0 2px 6px #ccc;}

  .shopGoodsListNav .item{display: inline-block;justify-content: space-around;padding:0 0.22rem;font-size: 0.34rem;color:#3a3a3a;line-height: 0.8rem;}
  .shopGoodsListNav .item img{width:0.2rem;margin-left: 0.1rem;}
</style>
