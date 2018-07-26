<template>
  <div class="tab1">
    <div class="navBox">
      <div class="item" v-for="(item,key,index) in data" :class="{'show':curIndex===index}" @click="change(index)"><span class="s1">{{item.text}}</span></div>
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
      data:{
        type:Object,
        default:()=>{
          return {
            12:{
              id:0,
              text:"待接单",
            },
            13:{
              id:0,
              text:"已接单",
            },
            14:{
              id:0,
              text:"已拒绝",
            },
          }
        }
      },
      curIndex:{
        type:Number,
        default:0
      },
    },
    mounted(){

    },
    methods:{
      change(a){
        this.$emit('tabVal',a)
      }
    }

  }

</script>
<style scoped>
  .tab1{width:100%;height: 100%;position: relative;background-color: white}

  .navBox{height: 0.88rem;margin:0 0.88rem;display: flex;justify-content: space-around}

  .item{}

  .item .s1{font-size: 0.34rem;color:#3a3a3a;line-height: 0.88rem;}
  .item.show{border-bottom: 0.04rem solid #f86e0e;box-sizing: border-box;}
  .item.show .s1{color:#f86e0e;}


</style>
