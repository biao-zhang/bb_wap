<template>
  <div class="tab">
    <div class="navBox">
      <div class="item" v-for="(item,key,index) in data" :class="{'show':curIndex===index}" @click="change(index)"><span class="s1">{{item.text}}</span></div>
    </div>
  </div>
</template>
<script>

  import {Tab,TabItem} from 'vux'
  export default {
    data(){
      return{
//        curIndex:1,
        demo2:'',
        activeBgColor:'show'
      }
    },
    props:{
      data:{
        type:Object,
        default:()=>{
          return {
            12:{
              id:0,
              text:"我发布的",
            },
            13:{
              id:0,
              text:"我参与的",
            },
          }
        }
      },
      curIndex:{
        type:Number,
        default:0
      },
    },
    computed:{

    },
    mounted(){
//      console.log('111',this.curIndex)
    },
    components:{Tab,TabItem},
    methods:{
      change(a){
        this.$emit('tabVal',a)
      }
    }

  }

</script>
<style scoped>
  .tab{width:100%;height: 0.92rem;position: relative;background-color: white}

  .back{position: absolute;top:0;left: 0;width:0.17rem;height: 0.35rem;margin:0.26rem 0.21rem;}
  .back img{width:100%;height: 100%;}
  .navBox{height: 0.88rem;margin:0 0.88rem;display: flex;justify-content: space-around}

  .item{}

  .item .s1{font-size: 0.34rem;color:#3a3a3a;line-height: 0.88rem;}
  .item.show{border-bottom: 0.04rem solid #f86e0e;box-sizing: border-box;}
  .item.show .s1{color:#f86e0e;}


</style>
