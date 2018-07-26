<template>
  <div class="seckillTab">
    <div class="item" v-for="(item, index) in seckillTime" :class="{'show':curIndex === index}" @click="change(index)">
      <seckill-time :item-children="item"> </seckill-time>
    </div>
  </div>
</template>
<script>

import {Tab,TabItem} from 'vux'
import seckillTime from './seckillTime'

  export default {
    components:{
      Tab,
      TabItem,
      seckillTime
    },
    data(){
      return{
        curIndex: 0,
        demo2:'',
      }
    },
    props: ['seckillTime'],

    mounted(){

    },

    methods:{
      change( val ){
        this.curIndex = val
        this.$emit('tabVal', val)
      }
    }

  }

</script>
<style scoped>
  .seckillTab{width:100%;height: 1rem;display: flex;}

  .tab{width:100%;height: 100%;background-color: #555;}


  .item{width:2.5rem;height:100%;background-color: #555;color:white;position: relative;display: inline-block;}
  .item.show{background-color: #f15352;}


</style>
